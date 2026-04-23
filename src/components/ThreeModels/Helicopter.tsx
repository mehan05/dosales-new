import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function Helicopter({ rotorRef, tailRotorRef, doorRef }: { rotorRef: React.RefObject<THREE.Mesh>, tailRotorRef: React.RefObject<THREE.Mesh>, doorRef: React.RefObject<THREE.Mesh> }) {
  const whiteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.4, metalness: 0.1 }), []);
  const blackMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.7, metalness: 0.2 }), []);
  const windshieldMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#ff0000", 
    transparent: true, 
    opacity: 0.7, 
    roughness: 0.05, 
    metalness: 0.8,
    side: THREE.DoubleSide
  }), []);

  return (
    <group scale={0.7}>
      {/* Main Chassis - Sleek Capsule */}
      <mesh material={whiteMat} castShadow rotation={[0, 0, Math.PI / 2]} position={[-0.1, 0, 0]}>
        <capsuleGeometry args={[0.45, 0.8, 4, 16]} />
      </mesh>

      {/* Red Cockpit Windshield - Positioned to wrap around the front */}
      <mesh material={windshieldMat} position={[0.4, 0.05, 0]} castShadow rotation={[0, -Math.PI/2, 0]}>
        <sphereGeometry args={[0.48, 32, 16, 0, Math.PI, 0, Math.PI / 1.6]} />
      </mesh>

      {/* Engine Housing (Back Top) */}
      <mesh material={blackMat} position={[-0.4, 0.45, 0]} castShadow>
        <boxGeometry args={[0.6, 0.2, 0.4]} />
      </mesh>

      {/* Tail Boom - Rod with reinforcement */}
      <group position={[-0.8, 0.1, 0]}>
        <mesh material={blackMat} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.03, 0.05, 2.2, 12]} />
        </mesh>
        {/* Support fins */}
        <mesh material={blackMat} position={[-0.5, 0.15, 0]} rotation={[0, 0, 0.4]} castShadow>
          <boxGeometry args={[0.4, 0.02, 0.1]} />
        </mesh>
      </group>

      {/* Tail Stabilizer & Rotor Support */}
      <group position={[-2.4, 0.25, 0]}>
        <mesh material={blackMat} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.15]} />
        </mesh>
        <mesh material={blackMat} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.5]} />
        </mesh>
      </group>

      {/* Main Rotor System */}
      <group position={[0, 0.5, 0]}>
        <mesh material={blackMat} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
        </mesh>
        <mesh ref={rotorRef} material={blackMat} position={[0, 0.25, 0]} castShadow>
          <group>
            <mesh castShadow><boxGeometry args={[3.4, 0.02, 0.12]} /></mesh>
            <mesh castShadow rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[3.4, 0.02, 0.12]} /></mesh>
          </group>
        </mesh>
      </group>

      {/* Tail Rotor */}
      <mesh ref={tailRotorRef} material={blackMat} position={[-2.4, 0.25, 0.12]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.7, 0.02, 0.06]} />
      </mesh>

      {/* Heavy Duty Landing Skids */}
      {[-0.45, 0.45].map((z, i) => (
        <group key={i}>
          {/* Struts */}
          <mesh material={blackMat} position={[0.25, -0.4, z]} rotation={[0, 0, -0.2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          </mesh>
          <mesh material={blackMat} position={[-0.35, -0.4, z]} rotation={[0, 0, 0.2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          </mesh>
          {/* Longitudinal Rail */}
          <mesh material={blackMat} position={[0, -0.65, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
          </mesh>
          {/* Skid tips curved up */}
          <mesh material={blackMat} position={[0.8, -0.6, z]} rotation={[0, 0, -Math.PI / 6]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
          </mesh>
        </group>
      ))}

      {/* Hidden Door Ref */}
      <mesh ref={doorRef} visible={false} />
    </group>
  );
}

export function Stickman({ stickRef }: { stickRef: React.RefObject<THREE.Group> }) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f0f4ff", roughness: 0.6, metalness: 0.05 }), []);
  return (
    <group ref={stickRef}>
      <mesh material={mat} position={[0, 0.52, 0]} castShadow><sphereGeometry args={[0.16, 8, 7]} /></mesh>
      <mesh material={mat} position={[0, 0.22, 0]} castShadow><capsuleGeometry args={[0.1, 0.22, 4, 8]} /></mesh>
      <mesh material={mat} position={[-0.2, 0.25, 0]} rotation={[0, 0, Math.PI / 4]} castShadow><capsuleGeometry args={[0.055, 0.18, 4, 6]} /></mesh>
      <mesh material={mat} position={[0.2, 0.25, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow><capsuleGeometry args={[0.055, 0.18, 4, 6]} /></mesh>
      <mesh material={mat} position={[-0.09, -0.05, 0]} rotation={[0.1, 0, 0.08]} castShadow><capsuleGeometry args={[0.065, 0.22, 4, 6]} /></mesh>
      <mesh material={mat} position={[0.09, -0.05, 0]} rotation={[0.1, 0, -0.08]} castShadow><capsuleGeometry args={[0.065, 0.22, 4, 6]} /></mesh>
    </group>
  );
}

const LOOP_DURATION = 15; // increased for the longer trip

export function HelicopterController({ targetPos, basePos }: { targetPos: THREE.Vector3, basePos: THREE.Vector3 }) {
  const heliGroupRef = useRef<THREE.Group>(null!);
  const rotorRef = useRef<THREE.Mesh>(null!);
  const tailRotorRef = useRef<THREE.Mesh>(null!);
  const doorRef = useRef<THREE.Mesh>(null!);

  const START_POS = useMemo(() => basePos.clone().add(new THREE.Vector3(0, 0.55, 0)), [basePos]);
  const LAND_POS = useMemo(() => targetPos.clone().add(new THREE.Vector3(0, 0.55, 0)), [targetPos]);

  const rotorSpeedRef = useRef(0);
  const doorOpenRef = useRef(0);

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() % LOOP_DURATION) / LOOP_DURATION;
    const heli = heliGroupRef.current;
    if (!heli) return;

    // Rotor logic
    if (t > 0.05 && t < 0.95) {
      rotorSpeedRef.current = Math.min(rotorSpeedRef.current + 0.01, 0.8);
    } else {
      rotorSpeedRef.current = Math.max(rotorSpeedRef.current - 0.01, 0);
    }
    if (rotorRef.current) rotorRef.current.rotation.y += rotorSpeedRef.current;
    if (tailRotorRef.current) tailRotorRef.current.rotation.x += rotorSpeedRef.current * 3.5;

    // Animation phases
    if (t < 0.1) { // 0-10%: Wait before takeoff
      heli.position.copy(START_POS);
      heli.rotation.set(0, 0, 0);
      doorOpenRef.current = 0;
    } else if (t < 0.4) { // 10-40%: Takeoff and fly to target
      const p = (t - 0.1) / 0.3;
      const easedP = easeInOut(p);
      const currentPos = new THREE.Vector3().lerpVectors(START_POS, LAND_POS, easedP);
      currentPos.y += Math.sin(easedP * Math.PI) * 5;
      heli.position.copy(currentPos);
      
      // Look at target
      const nextP = Math.min(p + 0.01, 1);
      const nextPos = new THREE.Vector3().lerpVectors(START_POS, LAND_POS, easeInOut(nextP));
      nextPos.y += Math.sin(easeInOut(nextP) * Math.PI) * 5;
      const direction = new THREE.Vector3().subVectors(nextPos, currentPos).normalize();
      heli.rotation.y = Math.atan2(-direction.z, direction.x);
      heli.rotation.z = direction.y * 0.5;
    } else if (t < 0.6) { // 40-60%: Land and stay on target helipad
      heli.position.copy(LAND_POS);
      // follow helipad oscillation
      const time = state.clock.getElapsedTime();
      heli.position.y = LAND_POS.y + Math.sin(time * 1.2 + 0.5) * 0.15;
      heli.rotation.set(0, 0, 0);
    } else if (t < 0.9) { // 60-90%: Fly back
      const p = (t - 0.6) / 0.3;
      const easedP = easeInOut(p);
      const currentPos = new THREE.Vector3().lerpVectors(LAND_POS, START_POS, easedP);
      currentPos.y += Math.sin(easedP * Math.PI) * 5;
      heli.position.copy(currentPos);

      const nextP = Math.min(p + 0.01, 1);
      const nextPos = new THREE.Vector3().lerpVectors(LAND_POS, START_POS, easeInOut(nextP));
      nextPos.y += Math.sin(easeInOut(nextP) * Math.PI) * 5;
      const direction = new THREE.Vector3().subVectors(nextPos, currentPos).normalize();
      heli.rotation.y = Math.atan2(-direction.z, direction.x);
      heli.rotation.z = direction.y * 0.5;
    } else { // 90-100%: Wait at start
      heli.position.copy(START_POS);
      heli.rotation.set(0, 0, 0);
      doorOpenRef.current = 0;
    }

    if (doorRef.current) doorRef.current.rotation.y = doorOpenRef.current * -Math.PI * 0.55;
  });

  return (
    <group>
      <group ref={heliGroupRef}>
        <Helicopter rotorRef={rotorRef} tailRotorRef={tailRotorRef} doorRef={doorRef} />
      </group>
    </group>
  );
}
