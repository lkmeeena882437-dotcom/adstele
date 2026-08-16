import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  Vector3,
} from 'three';

/* ============================================================
   "AD CONSTELLATION" — bespoke branded 3D hero scene
   Procedural geometry only (no external assets). Platform
   nodes = Meta (ice), Google (cyan), Telegram (violet)
   orbiting a glass core, linked by curved light-lines,
   inside a slow-drifting particle field.
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

// Live node positions shared with the connection lines (single scene instance)
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

function makeDotTexture(): CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
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

/* ---------- particle field ---------- */

function ParticleField({ count }: { count: number }) {
  const ref = useRef<Points>(null);
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(2 * Math.random() * Math.PI) * 0.6 + r * Math.sin(phi) * Math.sin(theta) * 0.45;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const material = new PointsMaterial({
      size: 0.05,
      map: makeDotTexture(),
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: AdditiveBlending,
      color: '#7dd3fc',
      sizeAttenuation: true,
    });
    const pts = new Points(geometry, material);
    pts.frustumCulled = false;
    return pts;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.018;
  });

  return <primitive ref={ref} object={points} />;
}

/* ---------- scene ---------- */

function Scene() {
  const { size } = useThree();
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const isMobile = size.width < 768;

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // inertial mouse parallax
    state.camera.position.x += (pointer.current.x * 0.9 - state.camera.position.x) * 0.045;
    state.camera.position.y += (-pointer.current.y * 0.6 - state.camera.position.y) * 0.045;
    state.camera.lookAt(0, 0, 0);
    // slow ambient drift + scroll reaction
    g.rotation.y += delta * 0.02 + scroll.current * 0.0012;
    g.scale.setScalar(isMobile ? 0.72 : 1);
  });

  return (
    <group ref={group}>
      <CoreNode />
      {PLATFORMS.map((def, i) => (
        <Platform key={def.name} index={i} def={def} />
      ))}
      <ConnectionLines />
      <ParticleField count={isMobile ? 160 : 420} />
    </group>
  );
}

export default function ConstellationCanvas() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 8.6], fov: 50 }}
      performance={{ min: 0.6 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={['#0a1128', 8, 24]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 6]} intensity={1.6} color="#e0f2fe" />
      <pointLight position={[0, 1, 3]} intensity={30} distance={14} decay={2} color="#38bdf8" />
      <pointLight position={[-6, -2, -5]} intensity={22} distance={14} decay={2} color="#8b5cf6" />
      <Scene />
    </Canvas>
  );
}
