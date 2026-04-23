import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Stadium({ delay = 0, scale = 1 }: { delay?: number, scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const { shape, liquidShape } = useMemo(() => {
    const w = 2.8, h = 3.6, r = 1.3;
    const s = new THREE.Shape();
    // Outer rounded rect
    s.absarc(-w / 2 + r, -h / 2 + r, r, Math.PI, Math.PI * 1.5);
    s.absarc(w / 2 - r, -h / 2 + r, r, Math.PI * 1.5, Math.PI * 2);
    s.absarc(w / 2 - r, h / 2 - r, r, 0, Math.PI * 0.5);
    s.absarc(-w / 2 + r, h / 2 - r, r, Math.PI * 0.5, Math.PI);

    // Hole
    const hr = 0.6;
    const ls = new THREE.Shape();
    ls.absarc(-w / 2 + r, -h / 2 + r + 0.15, hr, Math.PI, Math.PI * 1.5);
    ls.absarc(w / 2 - r, -h / 2 + r + 0.15, hr, Math.PI * 1.5, Math.PI * 2);
    ls.absarc(w / 2 - r, h / 2 - r - 0.15, hr, 0, Math.PI * 0.5);
    ls.absarc(-w / 2 + r, h / 2 - r - 0.15, hr, Math.PI * 0.5, Math.PI);
    
    s.holes.push(ls);
    return { shape: s, liquidShape: ls };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !show) return;
    
    // Entrance: Rise from floor
    if (groupRef.current.position.y < 0.6) {
      groupRef.current.position.y += 0.02;
    }

    // Float: Oscillate
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = 0.5 + Math.sin(t * 1.2 + delay) * 0.15;
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;

    // Liquid animation: Subtle wave/shimmer
    if (liquidRef.current) {
      // Raise the base water level from -0.15 to -0.05 to fill it up more
      liquidRef.current.position.y = -0.05 + Math.sin(t * 1.5 + delay) * 0.05;
      liquidRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.8) * 0.02;
      liquidRef.current.rotation.y = Math.sin(t * 1.1) * 0.02;
    }
  });

  return (
    <group 
      ref={groupRef}
      position={[0, -5, 0]} 
      scale={scale}
      visible={show}
    >
      {/* Outer Ring */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <extrudeGeometry 
          args={[shape, { 
            depth: 0.6, 
            bevelEnabled: true, 
            bevelThickness: 0.12, 
            bevelSize: 0.08, 
            bevelSegments: 5 
          }]} 
        />
        <meshStandardMaterial color="#f5da07" roughness={0.4} metalness={0.1} envMapIntensity={0.8} />
      </mesh>

      {/* Liquid Substance */}
      <mesh 
        ref={liquidRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.05, 0]} // Starting position matching the new raised level
      >
        <extrudeGeometry 
          args={[liquidShape, { 
            depth: 0.4, // Increased depth makes the volume of the liquid thicker
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 2
          }]} 
        />
        <meshPhysicalMaterial 
          color="#1e3bff" 
          transparent 
          opacity={0.9} 
          roughness={0.0} 
          metalness={0.1}
          transmission={0.8}
          thickness={1.5}
          emissive="#1e3bff"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
