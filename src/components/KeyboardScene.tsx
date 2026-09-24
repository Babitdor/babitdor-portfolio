'use client';

import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useIsClient } from '@/lib/useClient';
import { isWebGLAvailable } from '@/lib/webgl';
import Keyboard from './scene/Keyboard';
import Probe from './scene/Probe';
import CameraRig from './scene/CameraRig';
import LetterSprite from './scene/LetterSprite';

/**
 * Bundled image-based lighting.
 *
 * `RoomEnvironment` ships inside three, so this replaces the previous
 * `<Environment preset="city" />`, which fetched an HDR from a third-party CDN
 * at runtime. Nothing in the scene needs the network now.
 *
 * The mutation lives in a module-level helper rather than in the component
 * body: assigning to a hook-returned object inside a component is disallowed by
 * the React Compiler lint rules.
 */
function applyRoomEnvironment(gl: THREE.WebGLRenderer, scene: THREE.Scene): () => void {
  const pmrem = new THREE.PMREMGenerator(gl);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04);

  scene.environment = environment.texture;

  return () => {
    scene.environment = null;
    environment.dispose();
    pmrem.dispose();
  };
}

function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => applyRoomEnvironment(gl, scene), [gl, scene]);

  return null;
}

function SceneContents() {
  return (
    <>
      <StudioEnvironment />

      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 9, 6]} intensity={1.15} color="#dfffe9" />
      <directionalLight position={[-7, 5, -4]} intensity={0.4} color="#5fd6ff" />
      {/* Neutral, and deliberately so: a coloured key light tints every hue on
          the board toward itself, which is exactly what makes an RGB backlight
          read as one flat colour. */}
      <pointLight position={[0, 4.5, 6]} intensity={0.5} color="#ffffff" distance={18} />

      <Keyboard />
      <Probe />
      <LetterSprite />
      <CameraRig />

      {/* One soft ground shadow instead of real shadow maps: far cheaper, and
          enough to seat the keyboard in the scene. */}
      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.55}
        scale={26}
        blur={2.6}
        far={6}
        resolution={512}
        color="#000000"
      />
    </>
  );
}

export default function KeyboardScene() {
  const isClient = useIsClient();

  if (!isClient || !isWebGLAvailable()) return null;

  return (
    <div className="keyboardScene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 7.2, 13.5], fov: 32, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
