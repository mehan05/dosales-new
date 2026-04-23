import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import * as THREE from "three";

export function Digit({ value, position, color, delay = 0 }: { value: string, position: [number, number, number], color: string, delay?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((state) => {
    if (!groupRef.current || !show) return;
    
    // Entrance
    if (groupRef.current.position.y < position[1]) {
      groupRef.current.position.y += 0.05;
    }
    
    // Float
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 1.2 + delay) * 0.15;
    groupRef.current.rotation.z = Math.sin(t * 0.5 + delay) * 0.03;
  });

  return (
    <group 
      ref={groupRef} 
      position={[position[0], -5, position[2]]} 
      rotation={[-Math.PI / 2, 0, 0]}
      visible={show}
    >
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={5.5}
          height={0.8}
          bevelEnabled
          bevelThickness={0.18}
          bevelSize={0.12}
        >
          {value}
          <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} envMapIntensity={0.8} />
        </Text3D>
      </Center>
    </group>
  );
}
