"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Float,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/room/bedroom.glb");
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (modelRef.current) {
      // Subtle floating animation - gentle wave motion
      const t = state.clock.getElapsedTime();
      modelRef.current.rotation.y = Math.sin(t * 0.15) * 0.1;
    }
  });

  // Traverse and optimize materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.2}
      floatIntensity={0.4}
      floatingRange={[-0.1, 0.1]}
    >
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.28}
        position={[0, -0.3, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        intensity={0.3}
        angle={0.5}
        penumbra={1}
      />
    </>
  );
}

function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#2997ff"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 32]} />
        <meshBasicMaterial
          color="#9d4edd"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

export default function Model3D() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Canvas
        camera={{ position: [4, 2.5, 4], fov: 45 }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          <Lights />
          <Model />
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={12}
            blur={2.5}
            far={4}
            resolution={512}
            color="#000000"
          />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minDistance={2}
            maxDistance={10}
            target={[0, 0, 0]}
          />
          <Environment preset="city" environmentIntensity={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/room/bedroom.glb");
