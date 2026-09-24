'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll';
import { PRESS_TARGETS, keyToScenePosition } from '@/lib/keyboard-layout';

/**
 * Keyframed camera. Establishing shot at the top of the page, then a tighter
 * 3/4 view that frames whichever key is currently being pressed.
 */
export default function CameraRig() {
  const { camera } = useThree();

  const shots = useMemo(
    () =>
      PRESS_TARGETS.map(({ key }) => {
        const { x, z } = keyToScenePosition(key);
        // Sit behind and above the key, looking down at it.
        return {
          position: new THREE.Vector3(x * 0.45, 4.6, z + 7.4),
          target: new THREE.Vector3(x * 0.32, 0.5, z * 0.5),
        };
      }),
    [],
  );

  const wide = useMemo(
    () => ({
      position: new THREE.Vector3(0, 7.2, 13.5),
      target: new THREE.Vector3(0, 0, 0),
    }),
    [],
  );

  const currentPosition = useRef(wide.position.clone());
  const currentTarget = useRef(wide.target.clone());

  useFrame((_state, delta) => {
    const stage = THREE.MathUtils.clamp(scrollState.stage, 0, shots.length - 1);
    const shot = shots[stage];

    // Blend from the wide establishing shot into the stage shot over the
    // first third of the stage, so the move always feels scroll-driven.
    const blend = THREE.MathUtils.smoothstep(scrollState.stageT, 0.0, 0.34);

    const desiredPosition = wide.position.clone().lerp(shot.position, blend);
    const desiredTarget = wide.target.clone().lerp(shot.target, blend);

    currentPosition.current.x = THREE.MathUtils.damp(currentPosition.current.x, desiredPosition.x, 3.2, delta);
    currentPosition.current.y = THREE.MathUtils.damp(currentPosition.current.y, desiredPosition.y, 3.2, delta);
    currentPosition.current.z = THREE.MathUtils.damp(currentPosition.current.z, desiredPosition.z, 3.2, delta);

    currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, desiredTarget.x, 3.2, delta);
    currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, desiredTarget.y, 3.2, delta);
    currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, desiredTarget.z, 3.2, delta);

    camera.position.copy(currentPosition.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
