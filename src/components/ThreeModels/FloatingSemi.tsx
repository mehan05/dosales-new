import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingSemi({ position, delay = 0 }: { position: [number, number, number], delay?: number }) {
  const semiRef = useRef<THREE.Mesh>(null);
  
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const size = 0.6, r = 0.25;
    s.absarc(-size + r, -size + r, r, Math.PI, Math.PI * 1.5);
    s.absarc(size - r, -size + r, r, Math.PI * 1.5, Math.PI * 2);
    s.absarc(size - r, size - r, r, 0, Math.PI * 0.5);
    s.absarc(-size + r, size - r, r, Math.PI * 0.5, Math.PI);
    return s;
  }, []);

  useFrame((state) => {
    if (!semiRef.current) return;
    const t = state.clock.getElapsedTime();
    semiRef.current.position.y = 0.8 + Math.sin(t * 1.5 + delay) * 0.15;
  });

  return (
    <group position={position}>
      {/* Stand */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} castShadow receiveShadow>
        <extrudeGeometry 
          args={[shape, { 
            depth: 0.4, 
            bevelEnabled: true, 
            bevelThickness: 0.1, 
            bevelSize: 0.05, 
            bevelSegments: 3 
          }]} 
        />
        <meshStandardMaterial color="#1e3bff" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Semi-sphere (Hemisphere) */}
      <mesh ref={semiRef} position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  );
}
