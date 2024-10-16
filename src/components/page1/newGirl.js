'use client';
//!!!!! work White dancing !!!!
import React, { useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function GirlModel() {
  const gltf = useLoader(GLTFLoader, '/models/Michelle.glb');

  const { animations, scene } = gltf;

  const { ref, mixer } = useAnimations(animations, scene);

  console.log('animations', animations);
  scene.scale.set(1, 1, 1);

  useFrame((state, delta) => {
    if (mixer && animations.length) {
      mixer.update(delta * 0.1);
    }
  });
  React.useEffect(() => {
    if (animations.length > 0 && mixer) {
      const action = mixer.clipAction(animations[0]); // Assuming the first animation is the desired one
      action.play();
    }
  }, [animations, mixer]);

  if (!scene) {
    console.log(' No scene');
    return null;
  }

  scene.traverse((child) => {
    if (child.isSkinnedMesh) {
      // Применяем стандартный материал, поддерживающий skinning
      child.material = new THREE.MeshStandardMaterial({
        color: 0xffffff,

        // skinning: true, // delete?
      });
    }
  });
  console.log('scene', scene);

  return <primitive object={scene} ref={ref} />;
}

export default function NewGirl() {
  return (
    <div className="h-full w-full">
      <h1>New GIRL!</h1>
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
//it works but doesnt moove
// import React, { useEffect } from 'react';
// import { Canvas, useLoader, useFrame } from '@react-three/fiber';
// import { OrbitControls, Points, useAnimations } from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import * as THREE from 'three';

// function GirlModel() {
//   const gltf = useLoader(GLTFLoader, '/models/Michelle.glb');
//   console.log('GLTF loaded:', gltf);
//   const { animations, scene } = gltf;
//   console.log('Animations:', animations);
//   const { ref, mixer } = useAnimations(animations, scene);
//   console.log('Scene loaded:', scene);
//   scene.scale.set(1, 1, 1);

//   useFrame((state, delta) => {
//     if (mixer && animations.length) {
//       mixer.update(delta * 0.1);
//     }
//   });
//   React.useEffect(() => {
//     if (animations.length > 0 && mixer) {
//       const action = mixer.clipAction(animations[0]); // Assuming the first animation is the desired one
//       action.play();
//     }
//   }, [animations, mixer]);

//   if (!scene) {
//     console.log(' No scene');
//     return null;
//   }

//   const points = [];
//   console.log('points0', points);
//   scene.traverse((child) => {
//     console.log('points1', points);
//     if (child.isMesh) {
//       console.log('Found mesh:', child); // Отладочное сообщение
//       const geometry = child.geometry;
//       const material = new THREE.PointsMaterial({
//         color: 'white',
//         size: 0.05,
//       }); // Материал для точек
//       const pointCloud = new THREE.Points(geometry, material);
//       points.push(<primitive key={child.uuid} object={pointCloud} />);
//     }
//   });
//   console.log('points2', points);
//   if (points.length === 0) {
//     console.warn(
//       'No points generated from the model. Check the model geometry.'
//     );
//   }

//   return <group ref={ref}>{points}</group>;
// }
