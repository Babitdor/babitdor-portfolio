# Extract a tone grid from a photo for the ASCII portrait generator.
#
# Called by scripts/generate-portrait.mjs; not intended to be run by hand.
#
# Pipeline, in order:
#   1. GDI+ crops and box-filters the source down to 4x the target grid. This is
#      the only step that touches the full-resolution image, and it runs in native
#      code. (A per-pixel PowerShell loop over 2.5M pixels never finishes.)
#   2. The 4x4 blocks are averaged into one luminance value per character cell.
#   3. CLAHE opens up the low-contrast face. The photo is softly lit, so facial
#      features live in a narrow tonal band that a global ramp cannot separate.
#   4. Cells brighter than a percentile of the ORIGINAL luminance are forced to
#      pure white (= a blank cell). Without this the wall is equalised into mush
#      and the silhouette is lost.
#
# Output: a JSON 2D array of 0-255 tones on stdout.

param(
  [Parameter(Mandatory = $true)][string]$Path,
  [int]$Cols = 136,
  [int]$Rows = 76,
  [int]$CropX = 524,
  [int]$CropY = 30,
  [int]$CropSize = 760,
  [double]$WallPct = 88,
  [int]$TilesY = 6,
  [int]$TilesX = 7,
  [double]$Clip = 3.0
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile((Resolve-Path $Path).Path)
if ($CropY + $CropSize -gt $src.Height) { $CropY = $src.Height - $CropSize }
if ($CropX + $CropSize -gt $src.Width) { $CropX = $src.Width - $CropSize }
if ($CropX -lt 0) { $CropX = 0 }
if ($CropY -lt 0) { $CropY = 0 }

# --- 1. native crop + downscale to 4x the grid -------------------------------
$SS = 4
$small = New-Object System.Drawing.Bitmap(($Cols * $SS), ($Rows * $SS), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($small)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($src,
  (New-Object System.Drawing.Rectangle(0, 0, ($Cols * $SS), ($Rows * $SS))),
  (New-Object System.Drawing.Rectangle($CropX, $CropY, $CropSize, $CropSize)),
  [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$data = $small.LockBits((New-Object System.Drawing.Rectangle(0, 0, $small.Width, $small.Height)),
  [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $small.Height)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$small.UnlockBits($data)

# --- 2. box-average into one tone per cell ----------------------------------
$raw = New-Object 'double[]' ($Cols * $Rows)
for ($r = 0; $r -lt $Rows; $r++) {
  for ($c = 0; $c -lt $Cols; $c++) {
    $sum = 0.0
    for ($dy = 0; $dy -lt $SS; $dy++) {
      $oy = ($r * $SS + $dy) * $stride
      for ($dx = 0; $dx -lt $SS; $dx++) {
        $o = $oy + ($c * $SS + $dx) * 4
        # BGRA order; BT.601 luma
        $sum += 0.114 * $bytes[$o] + 0.587 * $bytes[$o + 1] + 0.299 * $bytes[$o + 2]
      }
    }
    $raw[$r * $Cols + $c] = $sum / ($SS * $SS)
  }
}
$small.Dispose()
$src.Dispose()

# --- 3. CLAHE ----------------------------------------------------------------
$sorted = $raw | Sort-Object
$wall = $sorted[[int][math]::Floor($sorted.Count * ($WallPct / 100.0))]

$tw = [math]::Ceiling($Cols / [double]$TilesX)
$th = [math]::Ceiling($Rows / [double]$TilesY)
$maps = New-Object 'double[][]' ($TilesY * $TilesX)
for ($ti = 0; $ti -lt $TilesY; $ti++) {
  for ($tj = 0; $tj -lt $TilesX; $tj++) {
    $hist = New-Object 'int[]' 256
    $n = 0
    $y0 = [int]($ti * $th); $y1 = [int][math]::Min($Rows, $y0 + $th)
    $x0 = [int]($tj * $tw); $x1 = [int][math]::Min($Cols, $x0 + $tw)
    for ($r = $y0; $r -lt $y1; $r++) {
      for ($c = $x0; $c -lt $x1; $c++) {
        $v = [int][math]::Floor($raw[$r * $Cols + $c])
        if ($v -lt 0) { $v = 0 } elseif ($v -gt 255) { $v = 255 }
        $hist[$v]++; $n++
      }
    }
    # Clip the histogram and redistribute the excess, which bounds the noise gain.
    $limit = [int]($Clip * $n / 256.0)
    if ($limit -lt 1) { $limit = 1 }
    $excess = 0
    for ($i = 0; $i -lt 256; $i++) {
      if ($hist[$i] -gt $limit) { $excess += $hist[$i] - $limit; $hist[$i] = $limit }
    }
    $share = [int]($excess / 256.0)
    for ($i = 0; $i -lt 256; $i++) { $hist[$i] += $share }

    $map = New-Object 'double[]' 256
    $acc = 0.0
    for ($i = 0; $i -lt 256; $i++) {
      $acc += $hist[$i]
      $map[$i] = if ($n -gt 0) { ($acc / $n) * 255.0 } else { $i }
    }
    $maps[$ti * $TilesX + $tj] = $map
  }
}

# Bilinear interpolation between tile mappings, so there are no tile seams.
$eq = New-Object 'double[]' ($Cols * $Rows)
for ($r = 0; $r -lt $Rows; $r++) {
  $fy = ($r + 0.5) / $th - 0.5
  $ti0 = [int][math]::Floor($fy); $wy = $fy - $ti0
  if ($ti0 -lt 0) { $ti0 = 0; $wy = 0 }
  if ($ti0 -gt $TilesY - 1) { $ti0 = $TilesY - 1 }
  $ti1 = [math]::Min($ti0 + 1, $TilesY - 1)
  for ($c = 0; $c -lt $Cols; $c++) {
    $fx = ($c + 0.5) / $tw - 0.5
    $tj0 = [int][math]::Floor($fx); $wx = $fx - $tj0
    if ($tj0 -lt 0) { $tj0 = 0; $wx = 0 }
    if ($tj0 -gt $TilesX - 1) { $tj0 = $TilesX - 1 }
    $tj1 = [math]::Min($tj0 + 1, $TilesX - 1)

    $v = [int][math]::Floor($raw[$r * $Cols + $c])
    if ($v -lt 0) { $v = 0 } elseif ($v -gt 255) { $v = 255 }

    $a = $maps[$ti0 * $TilesX + $tj0][$v]; $b = $maps[$ti0 * $TilesX + $tj1][$v]
    $cc = $maps[$ti1 * $TilesX + $tj0][$v]; $d = $maps[$ti1 * $TilesX + $tj1][$v]
    $top = $a + ($b - $a) * $wx
    $bot = $cc + ($d - $cc) * $wx
    $eq[$r * $Cols + $c] = $top + ($bot - $top) * $wy
  }
}

# --- 4. blank the background, using the ORIGINAL tone ------------------------
# JSON is built by hand rather than with ConvertTo-Json, which throws
# "Argument types do not match" on a list of double[] (verified in isolation).
$sb = New-Object System.Text.StringBuilder
[void]$sb.Append('[')
for ($r = 0; $r -lt $Rows; $r++) {
  if ($r -gt 0) { [void]$sb.Append(',') }
  [void]$sb.Append('[')
  for ($c = 0; $c -lt $Cols; $c++) {
    if ($c -gt 0) { [void]$sb.Append(',') }
    $i = $r * $Cols + $c
    $v = if ($raw[$i] -ge $wall) { 255 } else { [int][math]::Round($eq[$i]) }
    [void]$sb.Append($v)
  }
  [void]$sb.Append(']')
}
[void]$sb.Append(']')
Write-Output $sb.ToString()
