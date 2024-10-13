// components/GirlModel.js
// src/GirlModel.js
'use client';
// src/GirlModel.js
// src/GirlModel.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Правильный импорт GLTFLoader

const GirlModel = () => {
  const mountRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
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
    mountRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('models/Michelle.glb', (gltf) => {
      const object = gltf.scene;
      mixerRef.current = new THREE.AnimationMixer(object);
      const action = mixerRef.current.clipAction(gltf.animations[0]);
      action.play();

      object.traverse((child) => {
        if (child.isMesh) {
          child.visible = false;

          // Создание облака точек с использованием MeshBasicMaterial
          const pointsMaterial = new THREE.PointsMaterial({
            color: 0xff0000,
            size: 5,
          }); // Задайте нужный цвет и размер точек
          const pointCloud = new THREE.Points(child.geometry, pointsMaterial);
          scene.add(pointCloud);
        }
      });

      scene.add(object);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();
      if (mixerRef.current) mixerRef.current.update(delta);

      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
      if (mixerRef.current) mixerRef.current.stopAllAction();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default GirlModel;
