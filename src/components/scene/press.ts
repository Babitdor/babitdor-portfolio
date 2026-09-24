import { MathUtils } from 'three';

/**
 * The press choreography is a PURE FUNCTION OF SCROLL PROGRESS.
 *
 * Nothing here reads wall-clock time. That is the whole point: because the
 * animation is `f(scrollProgress)`, scrolling back up plays it in reverse for
 * free, and scrubbing fast or slow always lands on a coherent pose.
 */

export type Vec2 = { x: number; z: number };

export type PressFrame = {
  /** Probe tip position in scene space */
  probe: { x: number; y: number; z: number };
  /** 0..1 how far the active key is depressed */
  depression: number;
  /** 0..1 contact flash, spikes at the moment of contact */
  flash: number;
  /** 0..1 probe tip halo intensity */
  halo: number;
};

/** Probe tip height while travelling between keys. */
export const HOVER_Y = 2.15;
/** Probe tip height at the instant of contact. */
export const CONTACT_Y = 0.63;
/** Probe tip height at full key travel. */
export const PRESS_Y = 0.5;
/** Maximum key travel. */
export const KEY_TRAVEL = 0.14;

/** Phase boundaries within a single stage (fraction of the stage's scroll). */
const PHASE = {
  travelStart: 0.12,
  travelEnd: 0.56,
  descendEnd: 0.72,
  releaseEnd: 0.86,
};

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const lerp = MathUtils.lerp;

export function pressChoreography(stageT: number, from: Vec2, to: Vec2): PressFrame {
  const t = MathUtils.clamp(stageT, 0, 1);

  // Travel: an arc from the previous key to this one.
  const travel = smoothstep(PHASE.travelStart, PHASE.travelEnd, t);
  const arc = Math.sin(Math.PI * travel);

  const x = lerp(from.x, to.x, travel);
  const z = lerp(from.z, to.z, travel);

  // Descend / press / release.
  const descend = smoothstep(PHASE.travelEnd, PHASE.descendEnd, t);
  const release = smoothstep(PHASE.descendEnd, PHASE.releaseEnd, t);

  // `descend` drives the press; `release` lifts the probe back off the key.
  const pressDepth = descend * (1 - release);

  const y = lerp(HOVER_Y, CONTACT_Y, descend) - pressDepth * (CONTACT_Y - PRESS_Y);

  // Key travel follows the probe once it is in contact, and returns to 0.
  const depression = pressDepth;

  // A short, sharp flash centred on the contact moment.
  const contact = smoothstep(PHASE.descendEnd - 0.06, PHASE.descendEnd, t);
  const flash = contact * (1 - smoothstep(PHASE.descendEnd, PHASE.releaseEnd, t));

  return {
    probe: {
      x,
      y: y + arc * 0.3,
      z,
    },
    depression,
    flash,
    halo: 0.25 + pressDepth * 0.75,
  };
}
