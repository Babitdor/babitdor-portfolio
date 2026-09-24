'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll';
import { PRESS_TARGETS, keyToScenePosition } from '@/lib/keyboard-layout';
import { getLetterTexture } from './legend';

/**
 * The glyph that pops above the active key when it is pressed, spelling the
 * word one letter per section.
 */
export default function LetterSprite() {
  const spriteRef = useRef<THREE.Sprite>(null);
  const materialRef = useRef<THREE.SpriteMaterial>(null);

  const targets = useMemo(
    () =>
      PRESS_TARGETS.map(({ key, letter }) => {
        const { x, z } = keyToScenePosition(key);
        return { x, z, letter };
      }),
    [],
  );

  // Re-point the sprite at the current stage's glyph.
  useEffect(() => {
    const material = materialRef.current;
    return () => {
      material?.map?.dispose();
    };
  }, []);

  useFrame(() => {
    const sprite = spriteRef.current;
    const material = materialRef.current;
    if (!sprite || !material) return;

    const stage = THREE.MathUtils.clamp(scrollState.stage, 0, targets.length - 1);
    const target = targets[stage];

    const texture = getLetterTexture(target.letter);
    if (material.map !== texture) {
      material.map = texture;
      material.needsUpdate = true;
    }

    sprite.position.set(target.x, 1.55, target.z);

    // Appear only around the contact moment.
    const t = scrollState.stageT;
    const rise = THREE.MathUtils.smoothstep(t, 0.6, 0.8);
    const fall = 1 - THREE.MathUtils.smoothstep(t, 0.86, 1);
    const opacity = Math.max(0, Math.min(1, rise * fall));

    material.opacity = THREE.MathUtils.damp(material.opacity, opacity * 0.95, 14, 1 / 60);
    sprite.scale.setScalar(0.75 + rise * 0.25);
  });

  return (
    <sprite ref={spriteRef} position={[0, 1.55, 0]}>
      <spriteMaterial
        ref={materialRef}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  );
}
