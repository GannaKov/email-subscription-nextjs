'use client';

import React, { useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function GirlModel() {
  const gltf = useLoader(GLTFLoader, '/models/Michelle.glb');
  const { animations, scene } = gltf;
  const { ref, mixer } = useAnimations(animations, scene);

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  useEffect(() => {
    if (animations.length > 0 && mixer) {
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
  }, [animations, mixer]);

  if (!scene) {
    console.log('No scene');
    return null;
  }

  // Трансформация геометрии в облако точек
  scene.traverse((child) => {
    if (child.isMesh) {
      child.visible = false;

      const materialPoints = new THREE.PointsMaterial({
        size: 0.002, // Размер точек
        color: 0xffffff, // Цвет точек
        sizeAttenuation: true,
      });

      const pointCloud = new THREE.Points(child.geometry, materialPoints);

      scene.add(pointCloud);
    }
  });

  return <primitive object={scene} ref={ref} />;
}

function VeryNewGirl() {
  return (
    <div className="h-full w-full">
      <h1>Very New GIRL</h1>
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

export default VeryNewGirl;
