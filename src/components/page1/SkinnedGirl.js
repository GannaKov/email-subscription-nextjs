'use client';

import React, { useEffect, useMemo } from 'react';
import { extend, Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import PointsNodeMaterial from 'three/src/materials/nodes/PointsNodeMaterial.js';
import { uniform, skinning } from 'three/tsl';
// import WebGPURenderer from 'three/src/renderers/webgpu/WebGPURenderer.js';

function GirlModel() {
  const gltf = useLoader(GLTFLoader, '/models/Michelle.glb');
  const { animations, scene } = gltf;

  const { mixer } = useAnimations(animations, scene);

  useEffect(() => {
    if (animations.length > 0 && mixer) {
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
  }, [animations, mixer]);

  // Обработаем точки
  const points = useMemo(() => {
    const pointGeometry = new THREE.BufferGeometry();
    const pointsCount = 1000; // Количество точек

    // Сгенерируем случайные точки
    const positions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    pointGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const pointMaterial = new THREE.PointsMaterial({
      color: 0xff0000, // Цвет точек
      size: 0.1, // Размер точек
    });

    return new THREE.Points(pointGeometry, pointMaterial);
  }, []);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
  });

  return (
    <>
      <primitive object={scene} />
      <primitive object={points} />
    </>
  );
}

function SkinnedGirl() {
  // useEffect(() => {
  //   const canvas = document.querySelector('canvas');
  //   if (canvas) {
  //     const renderer = new WebGPURenderer({ antialias: true, canvas });
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   }
  // }, []);
  return (
    <div className="h-full w-full">
      <h1>SkinnedGirl</h1>
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

export default SkinnedGirl;
