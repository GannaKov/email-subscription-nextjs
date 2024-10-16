'use client';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { extend, useFrame, Canvas, useLoader } from '@react-three/fiber';

import { uniform, skinning } from 'three/tsl';
import { useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import PointsNodeMaterial from 'three/src/materials/nodes/PointsNodeMaterial.js';
import { WebGLRenderer } from 'three';
import { WebGPURenderer } from 'three/src/renderers/webgpu/WebGPURenderer.js';

class PointsNode extends THREE.Points {
  constructor(node) {
    const material = new PointsNodeMaterial();
    material.colorNode = uniform(new THREE.Color(0xffffff)); // Установите цвет для материала
    if (node instanceof THREE.SkinnedMesh) {
      material.positionNode = skinning(node);
    } else {
      console.warn('Переданный узел не является SkinnedMesh');
      material.positionNode = uniform(new THREE.Vector3());
    }
    super(node.geometry, material);
  }
}

extend({ PointsNode }); // Переместили в правильное место

function Model() {
  const gltf = useGLTF('models/Michelle.glb');

  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), [gltf]);
  useFrame((_, delta) => mixer.update(delta));

  const points = useMemo(() => {
    const _points = [];
    gltf.scene.traverse((node) => node.isMesh && _points.push(node));
    return _points;
  }, [gltf]);

  return (
    <>
      <primitive visible={false} object={gltf.scene} />
      {points.map((point) => (
        <pointsNode key={point.uuid} args={[point]} />
      ))}
    </>
  );
}

function NewNewGirl() {
  return (
    <div className="h-full w-full">
      <h1>New New GIRL</h1>
      <div className="h-[900px]">
        <Canvas
          //   frameloop="never"
          camera={{ fov: 50, position: [0, 300, -85] }}
          //   gl={(canvas) => new WebGLRenderer({ canvas })}
          gl={{ antialias: true }}
          //   onCreated={(state) => {
          //     state.gl.init().then(() => state.set({ frameloop: 'always' }));
          //   }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
          <directionalLight position={[0, 1, 1]} intensity={2} />
          <Suspense>
            {' '}
            <Model />
          </Suspense>

          <OrbitControls target={[0, 0, -85]} />
        </Canvas>
      </div>
    </div>
  );
}

export default NewNewGirl;

// Получите root элемент для рендеринга
// const rootElement = document.getElementById('root'); // Убедитесь, что у вас есть элемент с id='root'

// if (rootElement) {
//   createRoot(rootElement).render(
//     <Canvas
//       frameloop="never"
//       gl={(canvas) => new WebGPURenderer({ canvas })}
//       camera={{ fov: 50, position: [0, 300, -85] }}
//       onCreated={(state) => {
//         state.gl.init().then(() => state.set({ frameloop: 'always' }));
//       }}
//     >
//       <Suspense>
//         <NewNewGirl /> {/* Используем ваш компонент здесь */}
//       </Suspense>
//       <OrbitControls target={[0, 0, -85]} />
//     </Canvas>
//   );
// }
