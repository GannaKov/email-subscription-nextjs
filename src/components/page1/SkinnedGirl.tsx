'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function SkinnedGirl() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mixer: THREE.AnimationMixer | undefined;
    const clock = new THREE.Clock();

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 300, -85);
    camera.lookAt(0, 0, -85);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('/models/Michelle.glb', (gltf: any) => {
      const object = gltf.scene;
      mixer = new THREE.AnimationMixer(object);

      const action = mixer.clipAction(gltf.animations[0]);
      action.play();

      object.traverse((child: any) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).visible = false;

          const materialPoints = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1,
          });
          const pointCloud = new THREE.Points(
            (child as THREE.Mesh).geometry,
            materialPoints
          );
          scene.add(pointCloud);
        }
      });

      scene.add(object);
    });

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}

export default SkinnedGirl;
