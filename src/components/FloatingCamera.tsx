import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Lazy3D } from './LazyComponents';

const CameraModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        {/* Camera Body */}
        <boxGeometry args={[1.2, 0.8, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        
        {/* Lens */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Lens Glass */}
        <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            metalness={0} 
            roughness={0} 
            transparent 
            opacity={0.8}
            envMapIntensity={1}
          />
        </mesh>
      </mesh>
    </Float>
  );
};

export const FloatingCamera = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#f4d03f" />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#85c1e9" />
        
        <CameraModel />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};
