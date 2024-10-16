'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { extend, Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WebGPURenderer from 'three/src/renderers/webgpu/WebGPURenderer.js';
import PointsNodeMaterial from 'three/src/materials/nodes/PointsNodeMaterial.js';
import { Color } from 'three';
import { uniform, skinning } from 'three/tsl';

//import { Node, ColorNode } from 'three/src/nodes/Nodes.js';

class PointsNode extends THREE.Points {
  constructor(node: THREE.Mesh) {
    const material = new PointsNodeMaterial();
    material.size = 0.002;
    material.colorNode = uniform(new THREE.Color(0xffffff));
    if (node instanceof THREE.SkinnedMesh) {
      material.positionNode = skinning(node);
    } else {
      console.warn('Переданный узел не является SkinnedMesh');
      material.positionNode = uniform(new THREE.Vector3()); // Или используйте другую логику
    }
    super(node.geometry, material);
  }
}
extend({ PointsNode });

function GirlModel() {
  const gltf = useLoader(GLTFLoader, '/models/Michelle.glb');
  const { animations, scene } = gltf;
  const { ref, mixer } = useAnimations(animations, scene);

  const points = useMemo<THREE.Points[]>(() => {
    const _points: THREE.Points[] = []; // Массив для точек
    if (scene) {
      scene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          const pointCloud = new PointsNode(node); // Создаем точечный объект
          _points.push(pointCloud);
        }
      });
    }
    return _points; // Всегда возвращаем массив, даже если он пустой
  }, [scene]);

  useEffect(() => {
    // Убедитесь, что код выполняется только на клиенте
    if (typeof window !== 'undefined') {
      extend({ PointsNode }); // Здесь вызываем extend
    }
  }, []);

  useEffect(() => {
    if (points && points.length > 0) {
      points.forEach((point) => {
        scene.add(point);
      });
    }
  }, [points, scene]);

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

  return <primitive object={scene} ref={ref} />;
}

function Exp1() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !initialized.current) {
      if (typeof window !== 'undefined') {
        const renderer = new WebGPURenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        initialized.current = true;
      }
    }
  }, []);
  return (
    <div className="h-full w-full">
      <h1>Exp1 GIRL</h1>
      <div className="h-[900px]">
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          gl={{ antialias: true }}
          //   onCreated={({ gl }) => {
          //     // Store the HTMLCanvasElement reference in canvasRef
          //     canvasRef.current = gl.domElement;
          //   }}
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

export default Exp1;
