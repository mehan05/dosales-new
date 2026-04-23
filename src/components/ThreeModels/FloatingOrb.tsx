import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingOrb({ position, speed = 1, delay = 0, size = 0.3 }: { position: [number, number, number], speed?: number, delay?: number, size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    
    // Floating
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    ref.current.position.x = position[0] + Math.cos(t * 0.5) * 0.2;
    
    // Rotation
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.015;
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} envMapIntensity={1.5} />
    </mesh>
  );
}
