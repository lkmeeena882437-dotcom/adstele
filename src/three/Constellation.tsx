import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  QuadraticBezierCurve3,
  Vector3,
} from 'three';

/* ============================================================
   "AD CONSTELLATION" — bespoke branded hero 3D group.
   Procedural geometry only (no external assets). Platform
   nodes = Meta (ice), Google (cyan), Telegram (violet)
   orbiting a glass core, linked by curved light-lines.
   Rendered inside the single global scene (GlobalScene).
   ============================================================ */

type PlatformDef = {
  name: string;
  color: string;
  radius: number;
  speed: number;
  phase: number;
  size: number;
};

const PLATFORMS: PlatformDef[] = [
  { name: 'meta', color: '#38bdf8', radius: 3.0, speed: 0.16, phase: 0.0, size: 0.26 },
  { name: 'google', color: '#06b6d4', radius: 3.7, speed: -0.12, phase: 2.1, size: 0.24 },
  { name: 'telegram', color: '#8b5cf6', radius: 4.4, speed: 0.09, phase: 4.2, size: 0.26 },
];

// Live node positions shared with the connection lines
const nodePositions = [new Vector3(), new Vector3(), new Vector3()];

/* ---------- procedural textures ---------- */

function hexToRgba(hex: string, alpha: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function makeGlowTexture(hex: string): CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.15, hexToRgba(hex, 0.6));
  g.addColorStop(0.45, hexToRgba(hex, 0.16));
  g.addColorStop(1, hexToRgba(hex, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

/* ---------- core ---------- */

function CoreNode() {
  const inner = useRef<Mesh>(null);
  const wire = useRef<Mesh>(null);
  const glow = useMemo(() => makeGlowTexture('#38bdf8'), []);

  useFrame((_, delta) => {
    if (inner.current) {
      inner.current.rotation.y += delta * 0.14;
      inner.current.rotation.x += delta * 0.05;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.09;
      wire.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0284c7"
          emissiveIntensity={0.55}
          metalness={0.45}
          roughness={0.25}
          flatShading
        />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[1.15, 0.25, 0]}>
        <torusGeometry args={[2.3, 0.007, 8, 128]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[1.4, -0.45, 0.35]}>
        <torusGeometry args={[2.75, 0.005, 8, 128]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.16} />
      </mesh>
      <sprite scale={[6.4, 6.4, 1]}>
        <spriteMaterial map={glow} color="#38bdf8" transparent opacity={0.4} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* ---------- orbiting platform nodes ---------- */

function Platform({ index, def }: { index: number; def: PlatformDef }) {
  const group = useRef<Group>(null);
  const pivot = useRef<Group>(null);
  const angle = useRef(def.phase);
  const glow = useMemo(() => makeGlowTexture(def.color), [def.color]);

  useFrame((_, delta) => {
    angle.current += delta * def.speed;
    const a = angle.current;
    const x = Math.cos(a) * def.radius;
    const z = Math.sin(a) * def.radius;
    const y = Math.sin(a * 1.6 + def.phase) * 0.4;
    if (group.current) group.current.position.set(x, y, z);
    if (pivot.current) pivot.current.rotation.y += delta * 1.3;
    nodePositions[index].set(x, y, z);
  });

  return (
    <group ref={group}>
      <group ref={pivot}>
        <mesh position={[def.size * 3.2, 0, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={def.color} transparent opacity={0.95} />
        </mesh>
      </group>
      <mesh>
        <sphereGeometry args={[def.size, 32, 32]} />
        <meshStandardMaterial
          color={def.color}
          emissive={def.color}
          emissiveIntensity={0.65}
          metalness={0.35}
          roughness={0.3}
        />
      </mesh>
      <mesh rotation-x={1.25} rotation-z={0.4}>
        <torusGeometry args={[def.size * 2.2, 0.014, 12, 64]} />
        <meshBasicMaterial color={def.color} transparent opacity={0.55} />
      </mesh>
      <sprite scale={[def.size * 9, def.size * 9, 1]}>
        <spriteMaterial map={glow} color={def.color} transparent opacity={0.5} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* ---------- curved light-lines (core → platforms) ---------- */

function ConnectionLines() {
  const lines = useMemo(() => {
    return PLATFORMS.map(def => {
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new BufferAttribute(new Float32Array(49 * 3), 3));
      const material = new LineBasicMaterial({ color: def.color, transparent: true, opacity: 0.3 });
      const line = new Line(geometry, material);
      line.frustumCulled = false;
      return line;
    });
  }, []);

  useFrame(() => {
    nodePositions.forEach((pos, i) => {
      const attr = lines[i].geometry.getAttribute('position') as BufferAttribute;
      const curve = new QuadraticBezierCurve3(
        new Vector3(0, 0, 0),
        new Vector3(pos.x * 0.5, pos.y + 1.5, pos.z * 0.5),
        pos
      );
      const points = curve.getPoints(48);
      for (let j = 0; j < points.length; j++) {
        attr.setXYZ(j, points[j].x, points[j].y, points[j].z);
      }
      attr.needsUpdate = true;
    });
  });

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

export default function ConstellationGroup() {
  return (
    <group>
      <CoreNode />
      {PLATFORMS.map((def, i) => (
        <Platform key={def.name} index={i} def={def} />
      ))}
      <ConnectionLines />
    </group>
  );
}
