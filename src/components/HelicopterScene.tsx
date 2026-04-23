import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Easing ───────────────────────────────────────────────────────────────────
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Helipad ──────────────────────────────────────────────────────────────────
function Helipad() {
  // Main disc
  const discGeo = useMemo(() => new THREE.CylinderGeometry(2.8, 2.8, 0.22, 32), []);
  const discMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a3244", roughness: 0.9, metalness: 0.1 }), []);

  // Yellow H ring
  const ringGeo = useMemo(() => new THREE.RingGeometry(2.45, 2.75, 32), []);
  const ringMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffd43b", side: THREE.DoubleSide, roughness: 0.6 }), []);

  // H letter – two verticals + crossbar as boxes
  const hMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffd43b", roughness: 0.6 }), []);

  // Staircase steps
  const stepMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3a4660", roughness: 0.95, metalness: 0.05 }), []);
  const steps = [
    { y: 0.02, z: 3.15, h: 0.04 },
    { y: 0.07, z: 3.45, h: 0.14 },
    { y: 0.14, z: 3.75, h: 0.28 },
  ];

  // Red accent lights around edge
  const lightMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff4d26", emissive: "#ff4d26", emissiveIntensity: 1.2, roughness: 0.3 }), []);
  const lightAngles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2), []);

  return (
    <group position={[0, 0, 0]}>
      {/* Platform disc */}
      <mesh geometry={discGeo} material={discMat} position={[0, 0.11, 0]} receiveShadow castShadow />

      {/* Yellow ring */}
      <mesh geometry={ringGeo} material={ringMat} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.23, 0]} />

      {/* H verticals */}
      <mesh material={hMat} position={[-0.45, 0.24, 0]} castShadow>
        <boxGeometry args={[0.18, 0.04, 0.9]} />
      </mesh>
      <mesh material={hMat} position={[0.45, 0.24, 0]} castShadow>
        <boxGeometry args={[0.18, 0.04, 0.9]} />
      </mesh>
      {/* H crossbar */}
      <mesh material={hMat} position={[0, 0.24, 0]} castShadow>
        <boxGeometry args={[0.72, 0.04, 0.18]} />
      </mesh>

      {/* Red accent lights */}
      {lightAngles.map((angle, i) => (
        <mesh
          key={i}
          material={lightMat}
          position={[Math.cos(angle) * 2.65, 0.24, Math.sin(angle) * 2.65]}
        >
          <sphereGeometry args={[0.1, 6, 6]} />
        </mesh>
      ))}

      {/* Staircase – on the +Z side */}
      {steps.map((s, i) => (
        <mesh key={i} material={stepMat} position={[0, s.y, s.z]} receiveShadow>
          <boxGeometry args={[1.6, s.h, 0.3]} />
        </mesh>
      ))}

      {/* Staircase handrails */}
      <mesh material={stepMat} position={[-0.72, 0.28, 3.4]}>
        <boxGeometry args={[0.06, 0.44, 0.9]} />
      </mesh>
      <mesh material={stepMat} position={[0.72, 0.28, 3.4]}>
        <boxGeometry args={[0.06, 0.44, 0.9]} />
      </mesh>
    </group>
  );
}

// ─── Helicopter ───────────────────────────────────────────────────────────────
interface HelicopterProps {
  groupRef: React.RefObject<THREE.Group>;
  rotorRef: React.RefObject<THREE.Mesh>;
  tailRotorRef: React.RefObject<THREE.Mesh>;
  doorRef: React.RefObject<THREE.Mesh>;
}

function Helicopter({ groupRef, rotorRef, tailRotorRef, doorRef }: HelicopterProps) {
  const redMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#e03030", roughness: 0.5, metalness: 0.2 }), []);
  const darkRedMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#a01818", roughness: 0.6 }), []);
  const whiteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ddeeff", roughness: 0.1, metalness: 0.05, transparent: true, opacity: 0.75 }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a2e", roughness: 0.8 }), []);
  const silverMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#cccccc", metalness: 0.8, roughness: 0.2 }), []);

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh material={redMat} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.55, 8, 6]} />
      </mesh>
      {/* Nose */}
      <mesh material={redMat} position={[0.5, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.32, 6, 5]} />
      </mesh>
      {/* Tail boom */}
      <mesh material={darkRedMat} position={[-0.9, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.15, 1.2, 8]} />
      </mesh>
      {/* Tail fin vertical */}
      <mesh material={darkRedMat} position={[-1.35, 0.25, 0]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.06]} />
      </mesh>
      {/* Tail fin horizontal */}
      <mesh material={darkRedMat} position={[-1.35, 0.1, 0]} castShadow>
        <boxGeometry args={[0.18, 0.06, 0.45]} />
      </mesh>

      {/* Cockpit window */}
      <mesh material={whiteMat} position={[0.48, 0.08, 0]} castShadow>
        <sphereGeometry args={[0.24, 6, 5]} />
      </mesh>

      {/* Door (swings open on Y axis) */}
      <mesh ref={doorRef} material={redMat} position={[0.12, 0, 0.55]} castShadow>
        <boxGeometry args={[0.38, 0.42, 0.04]} />
      </mesh>

      {/* Main rotor mast */}
      <mesh material={silverMat} position={[0, 0.58, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.18, 6]} />
      </mesh>
      {/* Main rotor */}
      <mesh ref={rotorRef} material={darkMat} position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[2.4, 0.04, 0.14]} />
      </mesh>

      {/* Landing skids */}
      {[-0.3, 0.3].map((z, i) => (
        <group key={i}>
          <mesh material={silverMat} position={[0.2, -0.48, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.85, 6]} />
          </mesh>
          <mesh material={silverMat} position={[0, -0.62, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 6]} />
          </mesh>
        </group>
      ))}

      {/* Tail rotor */}
      <mesh ref={tailRotorRef} material={darkMat} position={[-1.38, 0.22, 0.12]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.5, 0.03, 0.08]} />
      </mesh>
    </group>
  );
}

// ─── Stickman ─────────────────────────────────────────────────────────────────
function Stickman({ stickRef }: { stickRef: React.RefObject<THREE.Group> }) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f0f4ff", roughness: 0.6, metalness: 0.05 }), []);

  return (
    <group ref={stickRef}>
      {/* Head */}
      <mesh material={mat} position={[0, 0.52, 0]} castShadow>
        <sphereGeometry args={[0.16, 8, 7]} />
      </mesh>
      {/* Body */}
      <mesh material={mat} position={[0, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.22, 4, 8]} />
      </mesh>
      {/* Left arm */}
      <mesh material={mat} position={[-0.2, 0.25, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <capsuleGeometry args={[0.055, 0.18, 4, 6]} />
      </mesh>
      {/* Right arm */}
      <mesh material={mat} position={[0.2, 0.25, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <capsuleGeometry args={[0.055, 0.18, 4, 6]} />
      </mesh>
      {/* Left leg */}
      <mesh material={mat} position={[-0.09, -0.05, 0]} rotation={[0.1, 0, 0.08]} castShadow>
        <capsuleGeometry args={[0.065, 0.22, 4, 6]} />
      </mesh>
      {/* Right leg */}
      <mesh material={mat} position={[0.09, -0.05, 0]} rotation={[0.1, 0, -0.08]} castShadow>
        <capsuleGeometry args={[0.065, 0.22, 4, 6]} />
      </mesh>
    </group>
  );
}

// ─── Floating Ambient Objects ─────────────────────────────────────────────────
function AmbientFloater({ position, shape, speed, delay, color }: {
  position: [number, number, number];
  shape: "box" | "sphere";
  speed: number;
  delay: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 0.55,
  }), [color]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + delay;
    ref.current.position.y = position[1] + Math.sin(t) * 0.35;
    ref.current.position.x = position[0] + Math.cos(t * 0.6) * 0.2;
    ref.current.rotation.x += 0.007;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={position} material={mat} castShadow>
      {shape === "box"
        ? <boxGeometry args={[0.22, 0.22, 0.22]} />
        : <sphereGeometry args={[0.14, 8, 8]} />}
    </mesh>
  );
}

// ─── MASTER ANIMATION CONTROLLER ─────────────────────────────────────────────
const LOOP_DURATION = 10; // seconds for one full loop

function Scene() {
  const heliGroupRef = useRef<THREE.Group>(null!);
  const rotorRef = useRef<THREE.Mesh>(null!);
  const tailRotorRef = useRef<THREE.Mesh>(null!);
  const doorRef = useRef<THREE.Mesh>(null!);
  const stickRef = useRef<THREE.Group>(null!);

  // Landing position of helicopter on pad
  const HELI_LAND = useMemo(() => new THREE.Vector3(0, 0.85, 0), []);
  const HELI_FLY_END = useMemo(() => new THREE.Vector3(40, 15, -10), []);

  // Stickman waypoints (flat on world XZ, Y handled separately)
  const STICK_STAIRS_BOTTOM = useMemo(() => new THREE.Vector3(0, 0.0, 4.2), []);
  const STICK_STAIRS_TOP = useMemo(() => new THREE.Vector3(0, 0.25, 2.8), []);
  const STICK_DOOR = useMemo(() => new THREE.Vector3(0.15, 0.25, 0.55), []);

  const rotorSpeedRef = useRef(0);
  const doorOpenRef = useRef(0); // 0 = closed, 1 = open

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() % LOOP_DURATION) / LOOP_DURATION; // 0..1

    const heli = heliGroupRef.current;
    const stick = stickRef.current;
    if (!heli || !stick) return;

    // ── Phase timings (0..1) ──────────────────────────────────────────────
    
    // Determine rotor target speed
    if (t >= 0.30 && t < 0.95) {
      const phase = Math.min((t - 0.30) / 0.10, 1); // spin up over 0.10
      rotorSpeedRef.current = easeInOut(phase) * 0.9; 
    } else if (t >= 0.95) {
      rotorSpeedRef.current *= 0.94; // Slower spin down
    } else {
      rotorSpeedRef.current = 0;
    }

    if (rotorRef.current) rotorRef.current.rotation.y += rotorSpeedRef.current;
    if (tailRotorRef.current) tailRotorRef.current.rotation.x += rotorSpeedRef.current * 3.5;

    // Door animation
    if (t >= 0.20 && t < 0.25) {
      doorOpenRef.current = easeInOut((t - 0.20) / 0.05);
    } else if (t >= 0.25 && t < 0.30) {
      doorOpenRef.current = 1 - easeInOut((t - 0.25) / 0.05);
    } else if (t < 0.20 || t >= 0.85) {
      doorOpenRef.current = 0;
    }
    if (doorRef.current) {
      doorRef.current.rotation.y = doorOpenRef.current * -Math.PI * 0.55;
    }

    // ── Stickman position ─────────────────────────────────────────────────
    if (t < 0.10) {
      const p = easeInOut(t / 0.10);
      stick.position.lerpVectors(STICK_STAIRS_BOTTOM, STICK_STAIRS_TOP, p);
      stick.visible = true;
    } else if (t < 0.20) {
      const p = easeInOut((t - 0.10) / 0.10);
      stick.position.lerpVectors(STICK_STAIRS_TOP, STICK_DOOR, p);
      stick.visible = true;
    } else if (t < 0.30) {
      stick.position.copy(STICK_DOOR);
      stick.visible = true;
    } else if (t < 0.85) {
      stick.visible = false; // inside helicopter
    } else {
      // Reset stickman back to stairs bottom
      stick.position.copy(STICK_STAIRS_BOTTOM);
      stick.visible = true;
    }

    // Stickman walk bob
    if (stick.visible && t < 0.30) {
      const elapsed = state.clock.getElapsedTime();
      stick.position.y += Math.sin(elapsed * 14) * 0.015;
      stick.rotation.y = Math.PI;
    }

    // ── Helicopter position ───────────────────────────────────────────────
    if (t < 0.40) {
      heli.position.copy(HELI_LAND);
      heli.rotation.set(0, 0, 0);
    } else if (t < 0.65) {
      // Phase 1: Fly AWAY
      const p = (t - 0.40) / 0.25;
      const easedP = easeInOut(p);
      
      const currentPos = new THREE.Vector3().lerpVectors(HELI_LAND, HELI_FLY_END, easedP);
      currentPos.y += Math.sin(easedP * Math.PI) * 4.5;
      heli.position.copy(currentPos);

      const nextP = Math.min(p + 0.01, 1);
      const nextPos = new THREE.Vector3().lerpVectors(HELI_LAND, HELI_FLY_END, easeInOut(nextP));
      nextPos.y += Math.sin(easeInOut(nextP) * Math.PI) * 4.5;
      const direction = new THREE.Vector3().subVectors(nextPos, currentPos).normalize();
      
      heli.rotation.y = Math.atan2(-direction.z, direction.x);
      heli.rotation.z = direction.y * 0.5;
      heli.rotation.x = -0.2; 

    } else if (t < 0.75) {
      // Phase 2: U-TURN (Curved turn)
      const p = (t - 0.65) / 0.10;
      const easedP = easeInOut(p);
      
      const angle = easedP * Math.PI;
      const radius = 2.5;
      // Start at FLY_END and curve around
      const currentPos = new THREE.Vector3(
        HELI_FLY_END.x + Math.sin(angle) * radius,
        HELI_FLY_END.y + Math.sin(easedP * Math.PI) * 0.5,
        HELI_FLY_END.z + (1 - Math.cos(angle)) * radius
      );
      heli.position.copy(currentPos);

      const nextP = Math.min(p + 0.01, 1);
      const nextAngle = easeInOut(nextP) * Math.PI;
      const nextPos = new THREE.Vector3(
        HELI_FLY_END.x + Math.sin(nextAngle) * radius,
        HELI_FLY_END.y + Math.sin(easeInOut(nextP) * Math.PI) * 0.5,
        HELI_FLY_END.z + (1 - Math.cos(nextAngle)) * radius
      );
      const direction = new THREE.Vector3().subVectors(nextPos, currentPos).normalize();

      heli.rotation.y = Math.atan2(-direction.z, direction.x);
      heli.rotation.x = -0.1;
      heli.rotation.z = -0.3; 

    } else if (t < 0.95) {
      // Phase 3: Fly BACK
      const p = (t - 0.75) / 0.20;
      const easedP = easeInOut(p);
      
      const U_TURN_END = new THREE.Vector3(HELI_FLY_END.x, HELI_FLY_END.y, HELI_FLY_END.z + 5.0); 
      
      const currentPos = new THREE.Vector3().lerpVectors(U_TURN_END, HELI_LAND, easedP);
      currentPos.y += Math.sin(easedP * Math.PI) * 3.5;
      heli.position.copy(currentPos);

      const nextP = Math.min(p + 0.01, 1);
      const nextPos = new THREE.Vector3().lerpVectors(U_TURN_END, HELI_LAND, easeInOut(nextP));
      nextPos.y += Math.sin(easeInOut(nextP) * Math.PI) * 3.5;
      const direction = new THREE.Vector3().subVectors(nextPos, currentPos).normalize();
      
      heli.rotation.y = Math.atan2(-direction.z, direction.x);
      heli.rotation.z = direction.y * 0.5;
      heli.rotation.x = -0.15;

    } else {
      // Phase 4: Land/Reset
      heli.position.copy(HELI_LAND);
      heli.rotation.set(0, 0, 0);
    }

    // Hover wobble while on pad (before liftoff)
    if (t < 0.30) {
      const elapsed = state.clock.getElapsedTime();
      heli.position.y = HELI_LAND.y + Math.sin(elapsed * 1.2) * 0.02;
      heli.rotation.x = Math.sin(elapsed * 2) * 0.02;
      heli.rotation.z = Math.cos(elapsed * 1.5) * 0.02;
    }
  });

  const ambients = useMemo(() => [
    { position: [-5.5, 3, -2] as [number, number, number], shape: "box" as const, speed: 0.7, delay: 0, color: "#4466ff" },
    { position: [5.5, 4.5, -3] as [number, number, number], shape: "sphere" as const, speed: 0.5, delay: 1.5, color: "#aabbff" },
    { position: [-4, 2.5, 3] as [number, number, number], shape: "box" as const, speed: 0.9, delay: 3, color: "#ffffff" },
    { position: [4.5, 5, 2] as [number, number, number], shape: "sphere" as const, speed: 0.6, delay: 2, color: "#ffd43b" },
    { position: [-6, 5.5, -5] as [number, number, number], shape: "box" as const, speed: 0.4, delay: 4, color: "#7788ff" },
    { position: [7, 3.5, 1] as [number, number, number], shape: "sphere" as const, speed: 0.8, delay: 0.5, color: "#ccddff" },
  ], []);

  return (
    <group position={[-10, -5, 0]} scale={0.75}> {/* Reduced size and moved away from the edge */}
      {/* Lighting */}
      <ambientLight intensity={0.55} color="#8899cc" />
      <directionalLight position={[6, 10, 5]} intensity={1.4} color="#ffffff" castShadow />
      <pointLight position={[-4, 5, 2]} intensity={0.6} color="#4466ff" />
      <pointLight position={[0, 0.4, 0]} intensity={0.4} color="#ff4d26" distance={4} />

      {/* Helipad */}
      <Helipad />

      {/* Helicopter */}
      <Helicopter 
        groupRef={heliGroupRef} 
        rotorRef={rotorRef}
        tailRotorRef={tailRotorRef}
        doorRef={doorRef}
      />

      {/* Stickman */}
      <Stickman stickRef={stickRef} />

      {/* Floating ambient objects */}
      {ambients.map((a, i) => (
        <AmbientFloater key={i} {...a} />
      ))}

      {/* Ground shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </group>
  );
}

// ─── Exported Component ───────────────────────────────────────────────────────
export default function HelicopterScene() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 15,
        pointerEvents: "none",
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 5, 25], fov: 40 }}
        dpr={[1, 1.5]}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  );
}


