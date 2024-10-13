'use client';
import React from 'react';

// import { uniform, skinning } from 'three/tsl';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, useAnimations } from '@react-three/drei';

// import { GLTFLoader } from '@three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function GirlModel() {
  const gltf = useLoader(GLTFLoader, '/models/Michelle.glb');
  console.log('GLTF loaded:', gltf);
  const { animations, scene } = gltf;

  const { ref, mixer } = useAnimations(animations, scene);

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
  console.log('Scene', scene);
  console.log('Animations:', animations);

  return <primitive object={scene} />;
}

export default function Girl() {
  return (
    <div className="h-full w-full">
      <h1>GIRL</h1>
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
// let camera, scene, renderer;

// let mixer, clock;

// init();

// function init() {
//   camera = new THREE.PerspectiveCamera(
//     50,
//     window.innerWidth / window.innerHeight,
//     1,
//     1000
//   );
//   camera.position.set(0, 300, -85);

//   scene = new THREE.Scene();
//   camera.lookAt(0, 0, -85);

//   clock = new THREE.Clock();

//   const loader = new GLTFLoader();
//   loader.load('models/Michelle.glb', function (gltf) {
//     const object = gltf.scene;
//     mixer = new THREE.AnimationMixer(object);

//     const action = mixer.clipAction(gltf.animations[0]);
//     action.play();

//     object.traverse(function (child) {
//       if (child.isMesh) {
//         child.visible = false;

//         const materialPoints = new THREE.PointsNodeMaterial();
//         materialPoints.colorNode = uniform(new THREE.Color());
//         materialPoints.positionNode = skinning(child);

//         const pointCloud = new THREE.Points(child.geometry, materialPoints);
//         scene.add(pointCloud);
//       }
//     });

//     scene.add(object);
//   });

//   //renderer

//   renderer = new THREE.WebGPURenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setAnimationLoop(animate);
//   document.body.appendChild(renderer.domElement);

//   window.addEventListener('resize', onWindowResize);
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate() {
//   const delta = clock.getDelta();

//   if (mixer) mixer.update(delta);

//   renderer.render(scene, camera);
// }
