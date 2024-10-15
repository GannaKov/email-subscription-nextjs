'use client';
import * as STDLIB from 'three-stdlib';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls, useAnimations } from '@react-three/drei';
// @ts-ignore
import { WebGPURenderer } from 'three/examples/jsm/renderers/WebGPURenderer';
import { Canvas, useThree } from '@react-three/fiber';
import { uniform, skinning } from 'three/examples/jsm/nodes/Nodes';

const GirlModel: React.FC = () => {
  const modelRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    // Проверка поддержки WebGPU в браузере
    if (!navigator.gpu) {
      console.error('WebGPU not supported in this browser.');
      return;
    }

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: WebGPURenderer | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set(0, 300, -85);
      camera.lookAt(0, 0, -85);

      renderer = new WebGPURenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setAnimationLoop(animate);

      if (canvasRef.current) {
        canvasRef.current.appendChild(renderer.domElement);
      }

      const loader = new GLTFLoader();
      loader.load('/models/gltf/Michelle.glb', (gltf) => {
        const object = gltf.scene;
        mixer = new THREE.AnimationMixer(object);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        object.traverse((child: any) => {
          if (child.isMesh) {
            child.visible = false;

            const materialPoints = new PointsNodeMaterial({
              size: 0.1,
              color: 0xffffff,
            });

            const pointCloud = new THREE.Points(child.geometry, materialPoints);
            scene.add(pointCloud);
          }
        });

        scene.add(object);
      });

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const animate = () => {
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={canvasRef} />;
};

const NewNewGirl: React.FC = () => {
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
};

export default NewNewGirl;
