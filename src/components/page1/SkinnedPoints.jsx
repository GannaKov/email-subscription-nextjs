// components/ThreeScene.js
'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SkinnedPoints = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, mixer, clock;

    const init = () => {
      // Set up the scene
      scene = new THREE.Scene();

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      // camera.position.set(0, 300, -85);
      camera.position.set(0, 150, 200);
      //camera.lookAt(0, 0, -85);
      camera.lookAt(0, 50, 0);

      // Clock for animations
      clock = new THREE.Clock();

      // Renderer setup (using WebGLRenderer instead of WebGPURenderer)
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      containerRef.current.appendChild(renderer.domElement);

      // Load GLTF model
      const loader = new GLTFLoader();
      loader.load('/models/Michelle.glb', (gltf) => {
        const object = gltf.scene;
        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        object.traverse((child) => {
          if (child.isMesh) {
            child.visible = false;

            const materialPoints = new THREE.PointsMaterial({
              color: 0xffffff,
              size: 2,
              sizeAttenuation: true,
            });
            const pointCloud = new THREE.Points(child.geometry, materialPoints);
            scene.add(pointCloud);
          }
        });

        scene.add(object);
      });

      // Handle window resize
      window.addEventListener('resize', onWindowResize);

      animate();
    };

    const onWindowResize = () => {
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
    };

    init();

    return () => {
      // Cleanup when component unmounts
      // Cleanup when component unmounts
      if (renderer && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-[900px] w-full">
        <div ref={containerRef} />
      </div>
    </div>
  );
};

export default SkinnedPoints;
