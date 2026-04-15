"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random stars with proper bounds checking
  const sphere = new Float32Array(5000 * 3);
  for (let i = 0; i < 5000; i++) {
    const radius = 50;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);
    
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
    
    sphere[i * 3] = isNaN(x) ? 0 : x;
    sphere[i * 3 + 1] = isNaN(y) ? 0 : y;
    sphere[i * 3 + 2] = isNaN(z) ? 0 : z;
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 30;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 30;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900" />
      <Canvas camera={{ position: [0, 0, 1] }} className="!fixed !inset-0">
        <Stars />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}