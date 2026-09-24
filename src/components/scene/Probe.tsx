'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll';
import { PRESS_TARGETS, keyToScenePosition } from '@/lib/keyboard-layout';
import { pressChoreography } from './press';

/**
 * A stylised robotic probe that travels the keyboard.
 *
 * Deliberately not a human hand: a rigged hand needs an external model with a
 * skeleton, and a probe reads more naturally inside a terminal aesthetic.
 */
export default function Probe() {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const targets = useMemo(
    () =>
      PRESS_TARGETS.map(({ key }) => {
        const { x, z } = keyToScenePosition(key);
        return { x, z };
      }),
    [],
  );

  const last = useRef({ x: targets[0].x, y: 2.15, z: targets[0].z });

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const stage = THREE.MathUtils.clamp(scrollState.stage, 0, targets.length - 1);
    const from = targets[Math.max(0, stage - 1)];
    const to = targets[stage];

    const frame = pressChoreography(scrollState.stageT, from, to);

    // Damp toward the computed pose so scroll jitter never reaches the mesh.
    last.current.x = THREE.MathUtils.damp(last.current.x, frame.probe.x, 12, delta);
    last.current.y = THREE.MathUtils.damp(last.current.y, frame.probe.y, 12, delta);
    last.current.z = THREE.MathUtils.damp(last.current.z, frame.probe.z, 12, delta);

    group.position.set(last.current.x, last.current.y, last.current.z);

    if (haloRef.current) {
      const material = haloRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.damp(material.opacity, 0.12 + frame.flash * 0.7, 16, delta);
      const scale = 1 + frame.flash * 0.7;
      haloRef.current.scale.set(scale, scale, 1);
    }

    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        0.6 + frame.flash * 7,
        16,
        delta,
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Shank */}
      <mesh position={[0, 0.62, 0]}>
        <capsuleGeometry args={[0.13, 0.62, 6, 12]} />
        <meshStandardMaterial color="#1b2420" roughness={0.35} metalness={0.55} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.14, 16]} />
        <meshStandardMaterial
          color="#39ff88"
          emissive="#39ff88"
          emissiveIntensity={1.1}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Tip */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.1, 18, 18]} />
        <meshStandardMaterial
          color="#eafff2"
          emissive="#7cf5ff"
          emissiveIntensity={1.6}
          roughness={0.2}
        />
      </mesh>

      {/* Contact halo */}
      <mesh ref={haloRef} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.24, 0.46, 32]} />
        <meshBasicMaterial
          color="#39ff88"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <pointLight ref={lightRef} position={[0, 0.1, 0]} color="#39ff88" intensity={0.6} distance={4} />
    </group>
  );
}
