'use client';
import React from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function GirlModel() {
  const gltf = useLoader(GLTFLoader, '/models/Michelle.glb');
  const { animations, scene } = gltf;
  const { ref, mixer } = useAnimations(animations, scene);

  useFrame((state, delta) => {
    if (mixer && animations.length) {
      mixer.update(delta);
    }
  });

  React.useEffect(() => {
    if (animations.length > 0 && mixer) {
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
  }, [animations, mixer]);

  // Проверяем, есть ли в сцене меши и преобразуем их в точки
  const points = [];
  scene.traverse((child) => {
    if (child.isMesh) {
      const geometry = child.geometry;
      points.push(
        <Points key={child.uuid} geometry={geometry}>
          <pointsMaterial attach="material" color="white" size={0.05} />
        </Points>
      );
    }
  });

  return <group ref={ref}>{points}</group>;
}

export default function NewGirl() {
  return (
    <div className="h-full w-full">
      <h1>Kuku</h1>
      <div className="h-[900px]">
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
          <directionalLight position={[0, 1, 1]} intensity={2} />
          <GirlModel />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
