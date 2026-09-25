# Render the ASCII-art source into the site's portrait asset.
#
# Input:  ASCII.png  (repository root, gitignored)
#         A raster ASCII-art render: a glyph grid whose glyphs are nearly black,
#         with the picture carried entirely by glyph brightness.
# Output: public/ascii-portrait.png
#         The same art, tinted `--accent` (#39ff88) on transparent, so it
#         composites onto a pane instead of sitting in a black rectangle.
#
# Why this is not just a levels change:
#
#   The source draws a DARK figure on a LIT glyph field. Measured on the
#   downscaled art, the wall sits at about luminance 33 (p75), the face at 14 and
#   the shirt at 6.5 (p50 is 5, so half the frame is near black and half sits on
#   that lit field).
#
#   Shipped as-is the file renders as a black square, and a straight brightness
#   lift inverts the read: the lit field becomes a bright halo and the subject
#   stays dark. Neither is the picture.
#
#   So luminance is turned into alpha, INVERTED: dark pixels become opaque (the
#   figure) and the lit field becomes transparent. That recovers the portrait and
#   drops the field. The frame edge is then faded, because that is where the field
#   is brightest and where an abrupt cut shows as a bright band.
#
# The tint is baked into the pixels rather than left to CSS. The site renders this
# through a plain <img>, and tinting a decorative image would otherwise require
# `mask-mode`, which is not reliably supported. Baking also keeps the glow and any
# future treatment in one place.
#
# Source quoted below is the tone range over which the subject reads; it was
# chosen from the measured percentiles, not by eye. 22 is just above p75 (the
# wall), and the 20-unit span reaches down to p50.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File scripts\ascii-portrait.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\ascii-portrait.ps1 -Width 1200

param(
    # Path to the source artwork. It lives in the repository root and is gitignored,
    # so in a git worktree the file will not be here: pass the main checkout path.
    [string]$Source = "",
    [int]$Width = 1000,
    [double]$Crop = 0.03,
    [double]$Vignette = 0.12
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class AsciiPortraitAsset {
    // lockBits -> luminance -> alpha, then tint. Never GetPixel: a per-pixel
    // PowerShell loop over a 10 MP image does not finish.
    public static void Build(string src, string outPath, int targetW, double crop, double vig) {
        using (var img = new Bitmap(src)) {
            int tw = targetW;
            int th = (int)Math.Round((double)img.Height * tw / img.Width);
            int cx = (int)Math.Round(img.Width * crop);
            int cy = (int)Math.Round(img.Height * crop);
            var srcRect = new Rectangle(cx, cy, img.Width - 2 * cx, img.Height - 2 * cy);

            using (var small = new Bitmap(tw, th, PixelFormat.Format32bppArgb)) {
                using (var g = Graphics.FromImage(small)) {
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                    g.DrawImage(img, new Rectangle(0, 0, tw, th), srcRect, GraphicsUnit.Pixel);
                }

                var rect = new Rectangle(0, 0, tw, th);
                var sd = small.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                int ss = sd.Stride;
                byte[] sb = new byte[ss * th];
                Marshal.Copy(sd.Scan0, sb, 0, sb.Length);
                small.UnlockBits(sd);

                using (var ob = new Bitmap(tw, th, PixelFormat.Format32bppArgb)) {
                    var od = ob.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                    int os = od.Stride;
                    byte[] obuf = new byte[os * th];
                    for (int y = 0; y < th; y++) {
                        int srow = y * ss, orow = y * os;
                        double ny = (double)y / (th - 1);
                        double edy = Math.Min(ny, 1 - ny);
                        for (int x = 0; x < tw; x++) {
                            int so = srow + x * 4;
                            double lum = 0.114 * sb[so] + 0.587 * sb[so + 1] + 0.299 * sb[so + 2];

                            double a = (22.0 - lum) / 20.0;      // inverted: dark = figure

                            double nx = (double)x / (tw - 1);
                            double edx = Math.Min(nx, 1 - nx);
                            double d = Math.Min(edx, edy) / vig; // fade the lit frame edge
                            if (d < 0) d = 0;
                            if (d > 1) d = 1;
                            a *= d;
                            if (a < 0) a = 0;
                            if (a > 1) a = 1;

                            int oo = orow + x * 4;
                            obuf[oo] = 136; obuf[oo + 1] = 255; obuf[oo + 2] = 57;  // --accent
                            obuf[oo + 3] = (byte)Math.Round(a * 255.0);
                        }
                    }
                    Marshal.Copy(obuf, 0, od.Scan0, obuf.Length);
                    ob.UnlockBits(od);
                    ob.Save(outPath, ImageFormat.Png);
                    Console.WriteLine("wrote " + outPath + "  " + tw + "x" + th + "  " +
                        new System.IO.FileInfo(outPath).Length / 1024 + " KB");
                }
            }
        }
    }
}
'@

$root = Split-Path -Parent $PSScriptRoot
$src = if ($Source) { $Source } else { Join-Path $root 'ASCII.png' }
$out = Join-Path $root 'public\ascii-portrait.png'

if (-not (Test-Path $src)) {
    throw "Source artwork not found: $src`nIt is gitignored, so a fresh clone must be given the file before this will run."
}
if (-not (Test-Path (Split-Path -Parent $out))) {
    throw "Output directory not found: $(Split-Path -Parent $out)"
}

[AsciiPortraitAsset]::Build($src, $out, $Width, $Crop, $Vignette)
