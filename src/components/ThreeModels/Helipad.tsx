import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Helipad({ position, radius = 0.5, delay = 0, oscillate = true }: { position: [number, number, number], radius?: number, delay?: number, oscillate?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current || !oscillate) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 1.2 + delay) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} receiveShadow>
      <cylinderGeometry args={[radius, radius, 0.12, 32]} />
      <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
      {/* Subtle 'H' or detail could go here, but keeping it simple as 'white circle' */}
    </mesh>
  );
}
