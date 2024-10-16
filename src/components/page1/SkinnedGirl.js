'use client';

import React, { useEffect, useMemo } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import PointsNodeMaterial from 'three/src/materials/nodes/PointsNodeMaterial.js';
import { uniform, skinning } from 'three/tsl';
import WebGPURenderer from 'three/src/renderers/webgpu/WebGPURenderer.js';

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
  const points = useMemo(() => {
    let pointCloud = null;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.visible = false;

        const materialPoints = new PointsNodeMaterial();
        materialPoints.colorNode = uniform(new THREE.Color());
        materialPoints.positionNode = skinning(child);

        pointCloud = new THREE.Points(child.geometry, materialPoints);
        console.log('in memo', pointCloud);
        // scene.add(pointCloud);
      }
    });
    return pointCloud;
  }, [scene]);
  // Трансформация геометрии в облако точек

  useEffect(() => {
    console.log('in Ef');
    if (points) {
      scene.add(points);
      console.log('scene in Ef', scene);
    }
  }, [points, scene]);
  console.log('points', points);
  console.log('scene ', scene);
  return <primitive object={scene} ref={ref} />;
}

function SkinnedGirl() {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const renderer = new WebGPURenderer({ antialias: true, canvas });
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);
  return (
    <div className="h-full w-full">
      <h1>SkinnedGirl</h1>
      <div className="h-[900px]">
        <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
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
