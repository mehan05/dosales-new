import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Pad({ position, size, delay = 0 }: { position: [number, number, number], size: number, delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + delay) * 0.05;
  });

  return (
    <mesh ref={ref} position={position} receiveShadow>
      <boxGeometry args={[size, 0.25, size]} />
      <meshStandardMaterial color="#bfdbfe" roughness={0.85} metalness={0.1} />
    </mesh>
  );
}
