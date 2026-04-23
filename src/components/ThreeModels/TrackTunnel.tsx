import { useMemo } from "react";
import * as THREE from "three";

export function TrackTunnel({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const distance = start.distanceTo(end);
  const direction = new THREE.Vector3().subVectors(end, start).normalize();
  const angle = Math.atan2(direction.x, direction.z);

  const tubeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2563eb",
    transparent: true,
    opacity: 0.4,
    roughness: 0.2,
    metalness: 0.1,
    side: THREE.DoubleSide,
  }), []);

  const structureMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2563eb",
    roughness: 0.4,
    metalness: 0.1,
  }), []);

  return (
    <group position={[start.x, start.y, start.z]} rotation={[0, angle, 0]}>
      {/* Full Enclosed Glass Tube */}
      <mesh position={[0, 0, distance / 2]} rotation={[Math.PI / 2, 0, 0]} material={tubeMat}>
        <cylinderGeometry args={[2.2, 2.2, distance, 32, 1, true]} />
      </mesh>
      
      {/* Longitudinal Support Beams */}
      <mesh position={[-2.3, 0, distance / 2]} receiveShadow castShadow material={structureMat}>
        <boxGeometry args={[0.2, 0.2, distance]} />
      </mesh>
      <mesh position={[2.3, 0, distance / 2]} receiveShadow castShadow material={structureMat}>
        <boxGeometry args={[0.2, 0.2, distance]} />
      </mesh>
      <mesh position={[0, -2.3, distance / 2]} receiveShadow castShadow material={structureMat}>
        <boxGeometry args={[0.6, 0.15, distance]} />
      </mesh>
      
      {/* Support Rings and Pillars */}
      {Array.from({ length: Math.floor(distance / 8) + 1 }).map((_, i) => (
        <group key={i} position={[0, 0, i * 8]}>
          {/* Blue Structural Ring */}
          <mesh rotation={[0, 0, 0]} castShadow receiveShadow material={structureMat}>
            <torusGeometry args={[2.25, 0.2, 16, 64]} />
          </mesh>
          {/* Central Pillar */}
          <mesh position={[0, -4.7, 0]} castShadow receiveShadow material={structureMat}>
            <boxGeometry args={[1.2, 4.5, 1.2]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
