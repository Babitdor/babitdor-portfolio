'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { KEYS, PRESS_TARGETS, keyToScenePosition, type KeyDef } from '@/lib/keyboard-layout';
import { scrollState } from '@/lib/scroll';
import { getLegendTexture } from './legend';
import { KEY_TRAVEL } from './press';
import { WAVE_TURNS, fract, hueForKey, shiftedHue } from './rgb';

/** Keycap pitch in scene units. */
export const PITCH = 1;
const CAP_W = 0.92;
const CAP_H = 0.46;
const CAP_D = 0.92;
const ACTIVE_STAGE_T = 0.72;

/** Steady legend brightness: how luminous the legend colour sits, 0..1. */
const LEGEND_L = 0.58;
/** The pressed key's legend goes white-hot rather than merely brighter. */
const LEGEND_PRESS_L = 0.95;
/** Untinted legends sit at this opacity; a pressed key's legend goes to 1. */
const LEGEND_OPACITY = 0.72;

type KeycapProps = { def: KeyDef; stage: number | null; letter: string | null };

function Keycap({ def, stage, letter }: KeycapProps) {
  const capRef = useRef<THREE.Mesh>(null);
  const legendRef = useRef<THREE.Mesh>(null);
  const legend = useMemo(() => getLegendTexture(def.label), [def.label]);
  const position = useMemo(() => keyToScenePosition(def), [def]);

  const width = CAP_W + (def.w - 1) * PITCH;

  // Baked once: this key's place in the spectrum never changes.
  const baseHue = useMemo(() => hueForKey(def), [def]);

  // Damped scroll phase, kept in a ref so the wave never re-renders React.
  const phase = useRef(0);

  useFrame(() => {
    const cap = capRef.current;
    if (!cap) return;

    let target = 0;
    if (stage !== null) {
      // The active key only presses once the choreography reaches contact.
      const isActive = scrollState.stage === stage;
      if (isActive) {
        const t = scrollState.stageT;
        const press =
          t <= ACTIVE_STAGE_T
            ? Math.min(1, t / ACTIVE_STAGE_T)
            : 1 - Math.min(1, (t - ACTIVE_STAGE_T) / (1 - ACTIVE_STAGE_T));
        target = Math.max(0, press);
      }
    }

    // Damp so fast scrubbing never snaps.
    cap.position.y = THREE.MathUtils.damp(cap.position.y, target * KEY_TRAVEL, 18, 1 / 60);
    if (legendRef.current) {
      legendRef.current.position.y = cap.position.y + CAP_H / 2 + 0.006;
    }

    const legendMaterial = legendRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (legendMaterial) {
      // The wave is driven by scroll progress, so it reverses for free. Damping
      // the phase keeps a fast flick from strobing the spectrum.
      phase.current = THREE.MathUtils.damp(phase.current, scrollState.progress, 8, 1 / 60);
      const hue = shiftedHue(baseHue, phase.current);

      // Only the LEGEND is tinted: the cap stays dark, which is what makes it
      // read as a backlit legend rather than a painted key. `setHSL` mutates the
      // existing Color, so this allocates nothing across ~60 keycaps.
      //
      // Colour is untouched by lighting (MeshBasicMaterial), so the hue is what
      // it says it is. Pressed drives saturation to 0 and lightness to white.
      legendMaterial.color.setHSL(
        hue,
        1 - target,
        THREE.MathUtils.lerp(LEGEND_L, LEGEND_PRESS_L, target),
      );
    }
  });

  const isPressKey = stage !== null;

  return (
    <group position={[position.x, 0, position.z]}>
      <RoundedBox
        ref={capRef}
        args={[width, CAP_H, CAP_D]}
        radius={0.1}
        smoothness={3}
        castShadow={false}
        receiveShadow={false}
      >
        <meshStandardMaterial
          color={isPressKey ? '#1d2b24' : '#151b19'}
          emissive="#000000"
          emissiveIntensity={0}
          roughness={0.45}
          metalness={0.12}
        />
      </RoundedBox>

      {/* The legend is the light source on a real backlit board: white texture,
          tinted per key, and unlit so the hue is exactly what is specified. */}
      <mesh ref={legendRef} position={[0, CAP_H / 2 + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * 0.78, CAP_D * 0.78]} />
        <meshBasicMaterial
          map={legend}
          transparent
          depthWrite={false}
          opacity={isPressKey ? 1 : LEGEND_OPACITY}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {letter ? (
        <mesh position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.5, 4, 1]} />
          <meshBasicMaterial color="#ff2f6a" transparent opacity={0.0} toneMapped={false} />
        </mesh>
      ) : null}
    </group>
  );
}

/**
 * The keyboard case plus every keycap.
 *
 * Built procedurally rather than loaded: there is no keyboard model in the
 * repo, and per-key press animation requires one mesh per keycap, which a
 * merged GLB could not give us.
 */
export default function Keyboard() {
  const stageForKey = useMemo(() => {
    const map = new Map<string, { stage: number; letter: string }>();
    PRESS_TARGETS.forEach(({ key, stage, letter }) => map.set(key.id, { stage, letter }));
    return map;
  }, []);

  const underglowRef = useRef<THREE.Mesh>(null);
  const underglowPhase = useRef(0);

  // The underglow is the one part of the board that is a single flat plane, so
  // it carries the wave as one colour rather than a per-key spectrum: dim and
  // desaturated, the way spill on a desk reads next to the legends.
  useFrame(() => {
    const plate = underglowRef.current;
    const material = plate?.material as THREE.MeshStandardMaterial | undefined;
    if (!material) return;

    underglowPhase.current = THREE.MathUtils.damp(
      underglowPhase.current,
      scrollState.progress,
      8,
      1 / 60,
    );
    material.emissive.setHSL(fract(underglowPhase.current * WAVE_TURNS), 0.85, 0.5);
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Case */}
      <RoundedBox args={[15.6, 1.05, 5.7]} radius={0.22} smoothness={4} position={[0, -0.62, 0]}>
        <meshStandardMaterial color="#0d1210" roughness={0.62} metalness={0.18} />
      </RoundedBox>

      {/* Wedge: a thin plate under the back edge, giving the case a typing angle */}
      <mesh position={[0, -1.12, -2.3]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[15.0, 0.34, 0.9]} />
        <meshStandardMaterial color="#0a0e0c" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Underglow: the board's own spill on the desk, tinted by the wave so it
          travels with the legends but stays dim and desaturated. */}
      <mesh ref={underglowRef} position={[0, -1.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15.2, 5.4]} />
        <meshStandardMaterial
          color="#050807"
          emissive="#39ff88"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Feet */}
      {[
        [-7.0, -0.7],
        [7.0, -0.7],
        [-7.0, 0.7],
        [7.0, 0.7],
      ].map(([fx, fz]) => (
        <mesh key={`${fx}-${fz}`} position={[fx, -1.3, fz * 2.6]}>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
          <meshStandardMaterial color="#050706" roughness={0.9} />
        </mesh>
      ))}

      {/* Keys sit on top of the case */}
      <group position={[0, 0.72, 0]}>
        {KEYS.map((def) => {
          const target = stageForKey.get(def.id);
          return (
            <Keycap
              key={def.id}
              def={def}
              stage={target ? target.stage : null}
              letter={target ? target.letter : null}
            />
          );
        })}
      </group>
    </group>
  );
}
