import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Flag({ position, delay = 0 }: { position: [number, number, number], delay?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const flagRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !flagRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Global Float
    groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + delay) * 0.1;
    
    // Flag Flutter: High-frequency, low-amplitude wiggle
    flagRef.current.rotation.y = Math.sin(t * 8) * 0.15;
    flagRef.current.rotation.z = Math.cos(t * 5) * 0.05;
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh ref={flagRef} position={[0.28, 1.45, 0]} castShadow>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial color="#cc1122" side={THREE.DoubleSide} roughness={0.7} metalness={0.2} />
      </mesh>
    </group>
  );
}
