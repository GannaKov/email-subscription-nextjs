// components/ThreeScene.js
'use client';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
function GirlModel() {
  const modelRef = useRef();
  const mixerRef = useRef();
  const pointCloudRefs = useRef([]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/models/Michelle.glb', (gltf) => {
      const object = gltf.scene;
      const animations = gltf.animations;
      mixerRef.current = new THREE.AnimationMixer(object);

      // Проходим по всем анимациям
      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });

      object.traverse((child) => {
        if (child.isMesh) {
          const geometry = child.geometry.clone();
          const material = new THREE.PointsMaterial({
            color: 'white',
            size: 0.05,
          });

          const pointCloud = new THREE.Points(geometry, material);
          modelRef.current.add(pointCloud);
          pointCloudRefs.current.push(pointCloud);
          child.visible = false; // Скрываем оригинальный меш
        }
      });

      // Добавляем объект в сцену
      modelRef.current.add(object);
    });
  }, []);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta); // Обновляем анимацию
    }

    // Обновляем позиции точек
    pointCloudRefs.current.forEach((pointCloud, index) => {
      const originalMesh = modelRef.current.children[index]; // Оригинальный меш по индексу
      if (originalMesh && pointCloud) {
        pointCloud.geometry.attributes.position.array.set(
          originalMesh.geometry.attributes.position.array
        );
        pointCloud.geometry.attributes.position.needsUpdate = true; // Указываем, что позиции обновлены
      }
    });
  });

  return <group ref={modelRef} />;
}

export default function Girl() {
  return (
    <div className="h-full w-full">
      <h1>New GIRL</h1>
      <div className="h-[900px] overflow-auto">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} />
          <GirlModel />
        </Canvas>
      </div>
    </div>
  );
}
