/**
 * A 60% mechanical keyboard layout, defined as data.
 *
 * Coordinates are in key units (1u = one standard keycap pitch) with the origin
 * at the top-left key. `w` is the width multiplier; `x`/`y` are the top-left
 * corner of the key in key units. Staggered rows use the real 60% offsets
 * (0.25u on row 2, 0.5u on row 3, 0.75u on row 4, 1.25u on row 5).
 *
 * Layout matches the 5 rows the animation needs: Esc is omitted so the probe
 * never has to reach the far top-left corner.
 */

export type KeyDef = {
  id: string;
  label: string;
  w: number;
  x: number;
  y: number;
};

export const KEY_UNIT = 1;

export const KEY_ROWS: { y: number; offset: number; keys: [string, number][] }[] = [
  {
    y: 0,
    offset: 0,
    keys: [
      ['`', 1], ['1', 1], ['2', 1], ['3', 1], ['4', 1], ['5', 1], ['6', 1], ['7', 1],
      ['8', 1], ['9', 1], ['0', 1], ['-', 1], ['=', 1], ['Backspace', 2],
    ],
  },
  {
    y: 1,
    offset: 0.25,
    keys: [
      ['Tab', 1.5], ['q', 1], ['w', 1], ['e', 1], ['r', 1], ['t', 1], ['y', 1], ['u', 1],
      ['i', 1], ['o', 1], ['p', 1], ['[', 1], [']', 1], ['\\', 1.5],
    ],
  },
  {
    y: 2,
    offset: 0.5,
    keys: [
      ['Caps', 1.75], ['a', 1], ['s', 1], ['d', 1], ['f', 1], ['g', 1], ['h', 1], ['j', 1],
      ['k', 1], ['l', 1], [';', 1], ["'", 1], ['Enter', 2.25],
    ],
  },
  {
    y: 3,
    offset: 0.75,
    keys: [
      ['Shift', 2.25], ['z', 1], ['x', 1], ['c', 1], ['v', 1], ['b', 1], ['n', 1], ['m', 1],
      [',', 1], ['.', 1], ['/', 1], ['Shift', 2.75],
    ],
  },
  {
    y: 4,
    offset: 1.25,
    keys: [
      ['Ctrl', 1.25], ['Alt', 1.25], ['Cmd', 1.25], ['Space', 6.25], ['Cmd', 1.25],
      ['Alt', 1.25], ['Ctrl', 1.25],
    ],
  },
];

function buildKeys(): KeyDef[] {
  const keys: KeyDef[] = [];
  KEY_ROWS.forEach((row) => {
    let cursor = row.offset;
    row.keys.forEach(([label, width], indexInRow) => {
      keys.push({
        id: `key-${label.toLowerCase()}-${row.y}-${indexInRow}`,
        label,
        w: width,
        x: cursor,
        y: row.y,
      });
      cursor += width;
    });
  });
  return keys;
}

export const KEYS: KeyDef[] = buildKeys();

/** Total layout width in key units, used to centre the case. */
export const BOARD_WIDTH = 15;

/** Look up the key that should be pressed for a given label. */
export function findKeyByLabel(label: string): KeyDef | undefined {
  return KEYS.find((key) => key.label.toLowerCase() === label.toLowerCase());
}

/**
 * The five keys the probe presses, in scroll order.
 * `Babit` -> home=B, about=a, skills=b, projects=i, contact=t
 */
export const PRESS_KEYS = ['b', 'a', 'b', 'i', 't'] as const;

export const PRESS_TARGETS = PRESS_KEYS.map((label, stage) => {
  const key = findKeyByLabel(label);
  if (!key) throw new Error(`keyboard layout is missing the "${label}" key`);
  return { stage, letter: label.toUpperCase(), key };
});

/**
 * Centre of a key in layout units, converted to scene coordinates.
 * Layout space is top-left origin, +y downward; scene space is centred, +y up.
 */
export function keyToScenePosition(key: KeyDef, rowCount = KEY_ROWS.length) {
  const centreX = key.x + key.w / 2;
  return {
    x: centreX - BOARD_WIDTH / 2,
    z: key.y + 0.5 - rowCount / 2,
  };
}
