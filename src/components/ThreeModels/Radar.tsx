import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Radar() {
  const groupRef = useRef<THREE.Group>(null);
  const dishGroupRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Mesh>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  
  const stateRef = useRef({
    mode: 'SCAN', // 'SCAN', 'SNAP', 'HOLD'
    timer: 0,
    scanTime: Math.random() * 10,
    rotY: 0,
    speed: 0.5,
    lastSnap: 0
  });

  const [pulseActive, setPulseActive] = useState(false);
  const pulseScale = useRef(1);
  const pulseOpacity = useRef(0);

  useFrame((state, delta) => {
    const s = stateRef.current;
    const t = state.clock.getElapsedTime();

    // LED Blinking (every 1.5s)
    if (ledRef.current) {
      const ledVisible = Math.floor(t / 0.75) % 2 === 0;
      ledRef.current.visible = ledVisible;
    }

    // Animation Logic
    if (s.mode === 'SCAN') {
      s.scanTime += delta;
      // Even slower speed and frequency
      const speedMod = Math.sin(s.scanTime * 0.15) * 0.2 + 0.8; 
      const swing = Math.sin(s.scanTime * 0.1 * speedMod) * Math.PI * 0.3;
      s.rotY = swing;
      
      // Check for snap trigger (every 10 seconds)
      if (t - s.lastSnap > 10) {
        s.mode = 'SNAP';
        s.timer = 0;
      }
    } else if (s.mode === 'SNAP') {
      s.timer += delta;
      const duration = 2.0; // Very slow snap
      const progress = Math.min(s.timer / duration, 1);
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      s.rotY = THREE.MathUtils.lerp(s.rotY, 0, ease);
      
      if (progress >= 1) {
        s.mode = 'HOLD';
        s.timer = 0;
        setPulseActive(true);
        pulseScale.current = 1;
        pulseOpacity.current = 0.6;
      }
    } else if (s.mode === 'HOLD') {
      s.timer += delta;
      s.rotY = 0;
      if (s.timer >= 1.5) { // Hold for 1.5s
        s.mode = 'SCAN';
        s.lastSnap = t;
      }
    }

    // Apply rotation to dish group
    if (dishGroupRef.current) {
      dishGroupRef.current.rotation.y = s.rotY;
      // Much slower tilt oscillation
      dishGroupRef.current.rotation.x = Math.sin(t * 0.4) * 0.05;
    }

    // Pulse animation
    if (pulseActive && pulseRef.current) {
      pulseScale.current += delta * 2;
      pulseOpacity.current -= delta * 0.5;
      pulseRef.current.scale.set(pulseScale.current, pulseScale.current, 1);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, pulseOpacity.current);
      
      if (pulseOpacity.current <= 0) {
        setPulseActive(false);
      }
    }
  });

  return (
    <group position={[0, 7, -2.5]}>
      {/* Base Pole */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 2.5, 8]} />
        <meshStandardMaterial color="#113bac" roughness={0.7} metalness={0.1} />
        {/* Red LED */}
        <mesh ref={ledRef} position={[0, 0.8, 0.2]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} />
        </mesh>
      </mesh>

      {/* Swivel Joint and Dish */}
      <group ref={dishGroupRef} position={[0, 0, 0]}>
        <group rotation={[-0.5, 0, 0]}> {/* More upward tilt */}
          {/* Main Parabolic Dish - Vertex at [0,0,0], opening towards +Z */}
          <mesh ref={dishRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2]}>
            <sphereGeometry args={[2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 3.5]} />
            <meshStandardMaterial color="#113bac" side={THREE.DoubleSide} roughness={0.6} metalness={0.1} />
          </mesh>
          
          {/* Antenna Feed Needle - Inside the bowl */}
          <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 1.2, 8]} />
            <meshStandardMaterial color="#113bac" roughness={0.5} metalness={0.3} />
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial color="#113bac" />
            </mesh>
          </mesh>

          {/* Signal Ring Pulse */}
          <mesh ref={pulseRef} position={[0, 0, 1.0]} rotation={[0, 0, 0]} visible={pulseActive}>
            <ringGeometry args={[0.2, 0.35, 32]} />
            <meshBasicMaterial transparent opacity={0.6} color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
