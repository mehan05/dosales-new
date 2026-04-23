import  { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Environment, Float, Grid } from "@react-three/drei";
import * as THREE from "three";

import {
  CircuitFloor,
  Stadium,
  Flag,
  FloatingOrb,
  Pad,
  Digit,
  Helipad,
  Radar,
  FloatingSemi,
  Spaceship,
  TrackTunnel,
  HelicopterController
} from "./ThreeModels";


export default function Three404() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('three-404-ready'));
  }, []);

  const pads: { pos: [number, number, number]; size: number }[] = useMemo(() => [
    { pos: [-16, 0.02, -10], size: 1.2 },
    { pos: [-12, 0.02, -12], size: 0.9 },
    { pos: [14, 0.02, -11], size: 1.5 },
    { pos: [16, 0.02, -8], size: 1.0 },
    { pos: [-15, 0.02, 8], size: 1.3 },
    { pos: [12, 0.02, 9], size: 1.1 },
    { pos: [18, 0.02, 0], size: 1.4 },
    { pos: [5, 0.02, -13], size: 0.8 },
  ], []);

  return (
    <div className="w-full h-screen  relative overflow-hidden">
    

      <Canvas 
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [-25, 25, 25], fov: 25 }}
        dpr={[1, 2]}
        shadows
      >
        <directionalLight position={[10, 20, 10]} intensity={2.5} castShadow />
        <ambientLight intensity={0.5} />
        
        <CircuitFloor />

        <Suspense fallback={null}>
          {/* Main 404 Group */}
          <group position={[0, 0, 0]}>
            <Digit value="4" position={[-6.5, 0.1, 0]} color="#f5da07" delay={0.1} />
            <Stadium delay={0.3} scale={1.5} />
            
            {/* Flags around the 0 */}
            <Flag position={[-1.2, 0.8, -1.2]} delay={0.5} />
            <Flag position={[0.0, 0.8, 1.5]} delay={0.7} />
            <Flag position={[1.2, 0.8, -1.2]} delay={0.9} />

             <Digit value="4" position={[6.5, 0.4, 0]} color="#f1542d" delay={0.5} />
            <Helipad position={[7.3, 1.0, 2.1]} delay={0.5} />
            <Helipad position={[-15, 2.1, -2]} radius={2.0} delay={0} oscillate={false} />
            <HelicopterController 
              targetPos={new THREE.Vector3(7.3, 1.0, 2.1)} 
              basePos={new THREE.Vector3(-15, 2.1, -2)}
            />
          </group>

          {/* Floating Semi-circles with Stands */}
          <FloatingSemi position={[-5.5, 0, 5.5]} delay={0} />
          <FloatingSemi position={[5.5, 0, 5.5]} delay={0.5} />

          <Radar />


          {/* Spaceship in Tunnel Bridge (Further Scaled to ~40%) */}
          <group position={[0, 2.4, 7.2]} scale={0.4}>
            <TrackTunnel
              start={new THREE.Vector3(100, 0.02, 12)} 
              end={new THREE.Vector3(-100, 0.02, 12)} 
            />
            <Spaceship
              start={new THREE.Vector3(100, 0.02, 12)} 
              end={new THREE.Vector3(-100, 0.02, 12)} 
            />
          </group>

          {/* Floating Orbs */}
          <FloatingOrb position={[-10, 4, -5]} speed={0.8} delay={0} size={0.4} />
          <FloatingOrb position={[8, 6, -8]} speed={0.6} delay={1} size={0.3} />
          <FloatingOrb position={[-12, 3, 6]} speed={0.9} delay={2} size={0.5} />
          <FloatingOrb position={[14, 5, 2]} speed={0.7} delay={3} size={0.2} />
          <FloatingOrb position={[0, 8, -15]} speed={0.5} delay={4} size={0.6} />



          {/* Floor Pads */}
          {pads.map((p, i) => (
            <Pad key={i} position={p.pos} size={p.size} delay={i * 0.2} />
          ))}

          {/* Removed Environment preset to eliminate purple tint from reflections */}
        </Suspense>

       
      </Canvas>
    </div>
  );
}
