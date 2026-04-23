import { useMemo } from "react";
import * as THREE from "three";

export function CircuitFloor() {
  const texture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background color
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(0, 0, size, size);

    // Circuit lines
    ctx.strokeStyle = '#1e3bff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawLine = (x: number, y: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      let curX = x;
      let curY = y;
      
      const steps = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < steps; i++) {
        if (Math.random() > 0.5) {
          curX += (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 150);
        } else {
          curY += (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 150);
        }
        ctx.lineTo(curX, curY);
      }
      ctx.stroke();

      // Terminal dot
      ctx.beginPath();
      ctx.arc(curX, curY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#1e3bff';
      ctx.fill();
    };

    for (let i = 0; i < 25; i++) {
      drawLine(Math.random() * size, Math.random() * size);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  if (!texture) return null;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.9} 
        metalness={0.0}
        emissive="#2563eb"
        emissiveIntensity={0.02}
      />
    </mesh>
  );
}
