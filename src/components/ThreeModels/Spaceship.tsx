import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Spaceship({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  
  const direction = useMemo(() => new THREE.Vector3().subVectors(end, start).normalize(), [start, end]);
  const angle = useMemo(() => Math.atan2(direction.x, direction.z), [direction]);

  const whiteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", metalness: 0.3, roughness: 0.6 }), []);
  const orangeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f26b0f", metalness: 0.3, roughness: 0.5 }), []);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.8 }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#333333", metalness: 0.8, roughness: 0.4 }), []);
  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#ffffff", emissiveIntensity: 5 }), []);

  useFrame((state, delta) => {
    progressRef.current = (progressRef.current + delta / 8.0) % 1;
    if (groupRef.current) {
      const pos = new THREE.Vector3().lerpVectors(start, end, progressRef.current);
      pos.y += Math.sin(state.clock.getElapsedTime() * 2) * 0.15;
      groupRef.current.position.copy(pos);
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, angle, 0]}>
      <group scale={0.5}>
        {/* --- Main Fuselage --- */}
        <mesh position={[0, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]} material={whiteMat} castShadow>
          <cylinderGeometry args={[0.05, 0.8, 2.5, 16]} />
        </mesh>
        
        <mesh position={[0, 0.4, 1.5]} rotation={[-0.15, 0, 0]} material={orangeMat} castShadow>
          <boxGeometry args={[0.6, 0.3, 2.0]} />
        </mesh>

        <mesh position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]} material={whiteMat} castShadow>
          <cylinderGeometry args={[0.8, 0.9, 2.5, 16]} />
        </mesh>

        {/* Cockpit */}
        <mesh position={[0, 0.85, 0.3]} rotation={[-0.2, 0, 0]} material={glassMat} castShadow>
          <capsuleGeometry args={[0.45, 0.8, 8, 16]} />
        </mesh>
        <mesh position={[0, 0.6, 0.3]} rotation={[-0.2, 0, 0]} material={orangeMat} castShadow>
          <boxGeometry args={[1.0, 0.4, 1.4]} />
        </mesh>

        {/* --- Wings --- */}
        <mesh position={[-1.8, 0, -0.5]} rotation={[0, -0.4, 0]} material={whiteMat} castShadow>
          <boxGeometry args={[3.0, 0.2, 1.5]} />
        </mesh>
        <mesh position={[1.8, 0, -0.5]} rotation={[0, 0.4, 0]} material={whiteMat} castShadow>
          <boxGeometry args={[3.0, 0.2, 1.5]} />
        </mesh>
        
        <mesh position={[-1.5, 0.11, -0.5]} rotation={[0, -0.4, 0]} material={orangeMat} castShadow>
          <boxGeometry args={[2.0, 0.05, 1.0]} />
        </mesh>
        <mesh position={[1.5, 0.11, -0.5]} rotation={[0, 0.4, 0]} material={orangeMat} castShadow>
          <boxGeometry args={[2.0, 0.05, 1.0]} />
        </mesh>

        <mesh position={[-3.1, 0.3, -1.0]} rotation={[0, -0.4, 0.2]} material={whiteMat} castShadow>
          <boxGeometry args={[0.1, 0.8, 1.2]} />
        </mesh>
        <mesh position={[3.1, 0.3, -1.0]} rotation={[0, 0.4, -0.2]} material={whiteMat} castShadow>
          <boxGeometry args={[0.1, 0.8, 1.2]} />
        </mesh>

        {/* --- Engines --- */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 1.1, 0.2, -1.2]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} material={whiteMat} castShadow>
              <cylinderGeometry args={[0.55, 0.6, 2.0, 16]} />
            </mesh>
            <mesh position={[0, 0, 0.8]} rotation={[-Math.PI / 2, 0, 0]} material={orangeMat} castShadow>
              <cylinderGeometry args={[0.58, 0.58, 0.5, 16]} />
            </mesh>
            <mesh position={[0, 0, -1.0]} rotation={[-Math.PI / 2, 0, 0]} material={darkMat} castShadow>
              <cylinderGeometry args={[0.5, 0.4, 0.3, 16]} />
            </mesh>
            <mesh position={[0, 0, -1.2]} material={glowMat}>
              <sphereGeometry args={[0.3, 16, 16]} />
            </mesh>
            <pointLight color="#ffffff" intensity={2} distance={4} position={[0, 0, -1.5]} />
          </group>
        ))}

        {/* --- Tail Fins --- */}
        <mesh position={[-0.5, 0.9, -1.2]} rotation={[0.2, 0, -0.3]} material={orangeMat} castShadow>
          <boxGeometry args={[0.1, 1.2, 1.2]} />
        </mesh>
        <mesh position={[0.5, 0.9, -1.2]} rotation={[0.2, 0, 0.3]} material={orangeMat} castShadow>
          <boxGeometry args={[0.1, 1.2, 1.2]} />
        </mesh>
      </group>
    </group>
  );
}
