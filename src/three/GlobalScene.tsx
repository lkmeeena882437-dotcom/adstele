import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import ConstellationGroup from './Constellation';
import { SCENE_THEMES } from '../data/content';

type SceneKey = keyof typeof SCENE_THEMES;
type SectionPosition = { x: number; y: number; visible: number };
interface SceneStore {
  scrollY: number;
  scrollProgress: number;
  scrollVelocity: number;
  vw: number;
  vh: number;
  active: SceneKey;
  heroProgress: number;
  pointer: { x: number; y: number };
  sections: Record<string, SectionPosition>;
}

const SCENE_IDS: SceneKey[] = ['problem', 'services', 'workflow', 'compare', 'pricing', 'testimonials', 'contact'];
const ZERO: SectionPosition = { x: 0, y: 0, visible: 0 };
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function radialTexture(size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,.95)');
  gradient.addColorStop(0.26, 'rgba(255,255,255,.42)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

function CameraRig({ store }: { store: SceneStore }) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const smooth = 1 - Math.exp(-delta * 3.2);
    const intro = clamp01(state.clock.elapsedTime / 1.6);
    const eased = 1 - Math.pow(1 - intro, 3);
    const z = 10.7 + (9 - 10.7) * eased;
    camera.position.x += (store.pointer.x * 0.95 - camera.position.x) * smooth;
    camera.position.y += (store.pointer.y * -0.65 - camera.position.y) * smooth;
    camera.position.z += (z - camera.position.z) * smooth;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function HeroRig({ store, mobile }: { store: SceneStore; mobile: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const smooth = 1 - Math.exp(-delta * 3);
    const scale = 0.6 + 0.4 * store.heroProgress;
    group.current.position.y += ((mobile ? -2 : -2.15) - group.current.position.y) * smooth;
    group.current.position.x += (store.pointer.x * 0.35 - group.current.position.x) * smooth;
    group.current.scale.lerp(new Vector3(scale, scale, scale), smooth);
    group.current.rotation.y += delta * 0.025;
  });
  return <group ref={group}><ConstellationGroup /></group>;
}

function Aurora({ store }: { store: SceneStore }) {
  const texture = useMemo(() => radialTexture(256), []);
  const sprites = useRef<(Sprite | null)[]>([]);
  const materials = useRef<(SpriteMaterial | null)[]>([]);
  const positions = useMemo(() => [new Vector3(-4.4, 2.6, -2.5), new Vector3(4.6, -2.8, -2.5), new Vector3(0.6, 3.4, -3.5)], []);
  const scales = [9.5, 10.5, 8.5];
  const color = useMemo(() => new Color(), []);
  useFrame((state, delta) => {
    const theme = SCENE_THEMES[store.active];
    const smooth = 1 - Math.exp(-delta * 2);
    sprites.current.forEach((sprite, index) => {
      if (!sprite) return;
      sprite.position.x = positions[index].x + Math.sin(state.clock.elapsedTime * 0.06 + index) * 0.4;
      sprite.position.y = positions[index].y + Math.cos(state.clock.elapsedTime * 0.05 + index) * 0.3;
      const material = materials.current[index];
      if (!material) return;
      material.color.lerp(color.set(theme.aurora[index]), smooth);
      const opacity = (0.5 - 0.18 * store.heroProgress) * theme.intensity;
      material.opacity += (opacity - material.opacity) * smooth;
    });
  });
  return <group>{positions.map((position, index) => (
    <sprite key={index} ref={node => { sprites.current[index] = node; }} position={position} scale={[scales[index], scales[index], 1]}>
      <spriteMaterial ref={node => { materials.current[index] = node; }} map={texture} transparent opacity={0.35} depthWrite={false} />
    </sprite>
  ))}</group>;
}

function DustField({ store, mobile }: { store: SceneStore; mobile: boolean }) {
  const points = useMemo(() => {
    const count = mobile ? 180 : 340;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      positions[index * 3] = (Math.random() - 0.5) * 20;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[index * 3 + 2] = -1 + (Math.random() - 0.5) * 6;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const material = new PointsMaterial({ size: 0.05, map: radialTexture(64), transparent: true, opacity: 0.32, depthWrite: false, color: '#cbd5e1' });
    const field = new Points(geometry, material);
    field.frustumCulled = false;
    return field;
  }, [mobile]);
  const color = useMemo(() => new Color(), []);
  useFrame((_, delta) => {
    points.rotation.y += delta * 0.012;
    const material = points.material as PointsMaterial;
    material.color.lerp(color.set(SCENE_THEMES[store.active].dust), 1 - Math.exp(-delta * 2.5));
    material.opacity += (0.32 - 0.1 * store.heroProgress - material.opacity) * (1 - Math.exp(-delta * 2.5));
  });
  return <primitive object={points} />;
}

function StarField({ mobile }: { mobile: boolean }) {
  const points = useMemo(() => {
    const count = mobile ? 120 : 260;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      const radius = 6.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const material = new PointsMaterial({ size: 0.035, map: radialTexture(64), transparent: true, opacity: 0.75, depthWrite: false, blending: AdditiveBlending, color: '#bae6fd' });
    const field = new Points(geometry, material);
    field.frustumCulled = false;
    return field;
  }, [mobile]);
  useFrame((_, delta) => { points.rotation.y += delta * 0.018; });
  return <primitive object={points} />;
}

function ScrollRibbon({ store }: { store: SceneStore }) {
  const line = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(60 * 3), 3));
    const material = new LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0 });
    const object = new Line(geometry, material);
    object.frustumCulled = false;
    return object;
  }, []);
  const marker = useRef<Group>(null);
  const markerMaterial = useRef<MeshStandardMaterial>(null);
  const active = useRef<SceneKey>(store.active);
  const pulse = useRef(0);
  const color = useMemo(() => new Color(), []);
  useFrame((state, delta) => {
    const positions = line.geometry.getAttribute('position') as BufferAttribute;
    const amplitude = 0.16 + clamp01(store.scrollVelocity) * 0.22;
    let markerX = 3.95;
    for (let index = 0; index < 60; index++) {
      const progress = index / 59;
      const x = 3.95 + Math.sin(progress * Math.PI * 5 + state.clock.elapsedTime * 0.5) * amplitude;
      positions.setXYZ(index, x, 3.6 - progress * 7.2, -1.2);
      if (Math.abs(progress - store.scrollProgress) < 1 / 59) markerX = x;
    }
    positions.needsUpdate = true;
    const material = line.material as LineBasicMaterial;
    material.color.lerp(color.set(SCENE_THEMES[store.active].aurora[1]), 1 - Math.exp(-delta * 3));
    material.opacity = 0.38 * (1 - store.heroProgress * 0.85);
    if (active.current !== store.active) {
      active.current = store.active;
      pulse.current = 1;
    }
    pulse.current = Math.max(0, pulse.current - delta * 1.7);
    if (marker.current) {
      marker.current.position.set(markerX, 3.6 - store.scrollProgress * 7.2, -1.15);
      const breathing = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.08;
      marker.current.scale.setScalar(breathing * (1 + pulse.current * 1.15));
      marker.current.rotation.y += delta * 0.7;
    }
    if (markerMaterial.current) {
      markerMaterial.current.color.lerp(color, 1 - Math.exp(-delta * 3));
      markerMaterial.current.emissive.lerp(color, 1 - Math.exp(-delta * 3));
      markerMaterial.current.emissiveIntensity = 0.6 + pulse.current * 1.6;
    }
  });
  return <group><primitive object={line} /><group ref={marker}><mesh><octahedronGeometry args={[0.12, 0]} /><meshStandardMaterial ref={markerMaterial} color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.7} /></mesh></group></group>;
}

function AccentRig({ id, store, mobile, anchor, children }: { id: SceneKey; store: SceneStore; mobile: boolean; anchor: [number, number]; children: ReactNode }) {
  const group = useRef<Group>(null);
  const { size, camera } = useThree();
  useFrame((_, delta) => {
    if (!group.current) return;
    const section = store.sections[id] ?? ZERO;
    const smooth = 1 - Math.exp(-delta * 4);
    const perspective = camera as PerspectiveCamera;
    const halfHeight = Math.tan((perspective.fov * Math.PI) / 360) * camera.position.z;
    const halfWidth = halfHeight * (size.width / Math.max(1, size.height));
    const targetX = section.x / Math.max(1, store.vw) * 2 * halfWidth + anchor[0];
    const targetY = -section.y / Math.max(1, store.vh) * 2 * halfHeight + anchor[1];
    group.current.position.x += (targetX - group.current.position.x) * smooth;
    group.current.position.y += (targetY - group.current.position.y) * smooth;
    group.current.rotation.y += (store.pointer.x * 0.22 - group.current.rotation.y) * smooth;
    group.current.rotation.x += (store.pointer.y * -0.16 - group.current.rotation.x) * smooth;
    const scale = mobile ? 0.001 : Math.max(0.001, section.visible);
    group.current.scale.lerp(new Vector3(scale, scale, scale), smooth);
  });
  return <group ref={group}>{children}</group>;
}

function ShatterField() {
  const shards = useRef<(Mesh | null)[]>([]);
  const wire = useRef<Mesh>(null);
  const bits = useRef<(Mesh | null)[]>([]);
  const origins = useMemo(() => Array.from({ length: 9 }, (_, index) => ({ x: Math.sin(index * 2.1) * 1.45, y: Math.cos(index * 1.7) * 1.05, z: (index % 3 - 1) * 0.35 })), []);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (wire.current) { wire.current.rotation.y += delta * 0.35; wire.current.rotation.x += delta * 0.13; }
    shards.current.forEach((shard, index) => {
      if (!shard) return;
      shard.position.set(origins[index].x + Math.sin(t * 0.55 + index) * 0.16, origins[index].y + Math.cos(t * 0.7 + index) * 0.15, origins[index].z);
      shard.rotation.x += delta * (0.25 + index * 0.02);
      shard.rotation.y -= delta * (0.18 + index * 0.015);
      const material = shard.material as MeshBasicMaterial;
      material.opacity = 0.35 + Math.sin(t * 1.2 + index) * 0.14;
    });
    bits.current.forEach((bit, index) => {
      if (!bit) return;
      const phase = (t * 0.32 + index * 0.24) % 1;
      bit.position.set((index - 1.5) * 0.22, 1.2 - phase * 2.5, Math.sin(index) * 0.2);
      (bit.material as MeshBasicMaterial).opacity = Math.sin(phase * Math.PI) * 0.75;
    });
  });
  return (
    <group>
      {origins.map((origin, index) => <mesh key={index} ref={node => { shards.current[index] = node; }} position={[origin.x, origin.y, origin.z]}><tetrahedronGeometry args={[0.16 + index % 3 * 0.05, 0]} /><meshBasicMaterial color={index % 2 ? '#fbbf24' : '#fb7185'} wireframe={index % 3 === 0} transparent opacity={0.4} /></mesh>)}
      <mesh ref={wire}><icosahedronGeometry args={[0.85, 1]} /><meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.5} /></mesh>
      <mesh><icosahedronGeometry args={[0.4, 0]} /><meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={0.65} /></mesh>
      {[0, 1, 2, 3].map(index => <mesh key={index} ref={node => { bits.current[index] = node; }}><tetrahedronGeometry args={[0.06, 0]} /><meshBasicMaterial color="#fbbf24" transparent /></mesh>)}
    </group>
  );
}

function CityRing({ x, radius, color, index }: { x: number; radius: number; color: string; index: number }) {
  const group = useRef<Group>(null);
  const satellites = useRef<Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.x = 0.55 + Math.sin(state.clock.elapsedTime * 0.22 + index) * 0.3;
      group.current.rotation.y += delta * (0.18 + index * 0.05);
      group.current.rotation.z += delta * (index % 2 ? -0.12 : 0.12);
    }
    if (satellites.current) satellites.current.rotation.z -= delta * (0.7 + index * 0.12);
  });
  return <group ref={group} position-x={x}><mesh><torusGeometry args={[radius, 0.055, 12, 96]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} /></mesh><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[radius * 0.72, 0.025, 10, 80]} /><meshBasicMaterial color={color} transparent opacity={0.55} /></mesh><group ref={satellites}>{[0, 1, 2].map(dot => <mesh key={dot} position={[Math.cos(dot * Math.PI * 2 / 3) * radius, Math.sin(dot * Math.PI * 2 / 3) * radius, 0]}><sphereGeometry args={[0.065, 12, 12]} /><meshBasicMaterial color="#fff" /></mesh>)}</group></group>;
}

function PlatformCity() {
  return <group scale={0.7}>{[
    { x: -3.4, radius: 1.5, color: '#38bdf8' },
    { x: 0, radius: 1.2, color: '#06b6d4' },
    { x: 3.4, radius: 1.5, color: '#8b5cf6' },
  ].map((ring, index) => <CityRing key={ring.x} {...ring} index={index} />)}</group>;
}

function RocketPath() {
  const rocket = useRef<Group>(null);
  const time = useRef(0);
  const trail = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(26 * 3), 3));
    const colors = new Float32Array(26 * 3);
    const purple = new Color('#a78bfa');
    for (let index = 0; index < 26; index++) {
      const fade = 1 - index / 26;
      colors[index * 3] = purple.r * fade;
      colors[index * 3 + 1] = purple.g * fade;
      colors[index * 3 + 2] = purple.b * fade;
    }
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    const material = new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75 });
    const object = new Line(geometry, material);
    object.frustumCulled = false;
    return object;
  }, []);
  useFrame((_, delta) => {
    time.current += delta;
    const point = (offset: number) => {
      const x = ((time.current - offset) * 0.55 % 7) - 3.5;
      return new Vector3(x, Math.sin(x * 0.85) * 0.5, Math.cos(x * 0.5) * 0.3);
    };
    const positions = trail.geometry.getAttribute('position') as BufferAttribute;
    for (let index = 0; index < 26; index++) {
      const position = point(index * 0.08);
      positions.setXYZ(index, position.x, position.y, position.z);
    }
    positions.needsUpdate = true;
    if (rocket.current) {
      const now = point(0);
      const next = point(-0.03);
      rocket.current.position.copy(now);
      rocket.current.rotation.z = Math.atan2(next.y - now.y, next.x - now.x) - Math.PI / 2;
    }
  });
  return <group><primitive object={trail} /><group ref={rocket} scale={0.7}><mesh position-y={0.13}><coneGeometry args={[0.14, 0.34, 16]} /><meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.8} /></mesh><mesh position-y={-0.12}><cylinderGeometry args={[0.1, 0.1, 0.28, 16]} /><meshStandardMaterial color="#7c3aed" /></mesh></group></group>;
}

function ArenaScene() {
  const rose = useRef<Mesh>(null);
  const green = useRef<Mesh>(null);
  const center = useRef<Mesh>(null);
  const flash = useRef<SpriteMaterial>(null);
  const trail = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(5 * 3), 3));
    const material = new LineBasicMaterial({ color: '#e0f2fe', transparent: true, opacity: 0.5 });
    const line = new Line(geometry, material);
    line.frustumCulled = false;
    return line;
  }, []);
  const texture = useMemo(() => radialTexture(), []);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const a = new Vector3(Math.cos(t * 0.6) * 1.2, Math.sin(t * 0.6) * 0.55, 0);
    const b = new Vector3(Math.cos(t * 0.6 + Math.PI) * 1.2, Math.sin(t * 0.6 + Math.PI) * 0.55, 0);
    rose.current?.position.copy(a);
    green.current?.position.copy(b);
    if (center.current) center.current.scale.setScalar(0.9 + Math.sin(t * 2) * 0.12);
    const positions = trail.geometry.getAttribute('position') as BufferAttribute;
    for (let index = 0; index < 5; index++) {
      const p = index / 4;
      positions.setXYZ(index, a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p + (index === 0 || index === 4 ? 0 : (Math.random() - 0.5) * 0.24), 0.1);
    }
    positions.needsUpdate = true;
    const opacity = Math.abs(Math.sin(t * 4));
    (trail.material as LineBasicMaterial).opacity = opacity * 0.8;
    if (flash.current) flash.current.opacity += (opacity * 0.55 - flash.current.opacity) * (1 - Math.exp(-delta * 8));
  });
  return <group><mesh rotation-x={1.1}><torusGeometry args={[1.35, 0.012, 8, 72]} /><meshBasicMaterial color="#94a3b8" transparent opacity={0.3} /></mesh><mesh ref={center}><sphereGeometry args={[0.18, 24, 24]} /><meshStandardMaterial color="#e0f2fe" emissive="#bae6fd" emissiveIntensity={0.7} /></mesh><mesh ref={rose}><sphereGeometry args={[0.22, 20, 20]} /><meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={0.8} /></mesh><mesh ref={green}><sphereGeometry args={[0.22, 20, 20]} /><meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} /></mesh><primitive object={trail} /><sprite scale={[1.2, 1.2, 1]}><spriteMaterial ref={flash} map={texture} blending={AdditiveBlending} transparent depthWrite={false} /></sprite></group>;
}

function CoinStacks() {
  const group = useRef<Group>(null);
  const sparkles = useRef<(Mesh | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.z = Math.sin(t * 0.35) * 0.055;
    sparkles.current.forEach((sparkle, index) => {
      if (!sparkle) return;
      const phase = (t * 0.18 + index / 24) % 1;
      sparkle.position.set(((index * 37) % 20) / 10 - 1, -0.8 + phase * 2.5, Math.sin(index) * 0.5);
      (sparkle.material as MeshBasicMaterial).opacity = Math.sin(phase * Math.PI) * 0.8;
    });
  });
  return <group ref={group}>{[4, 6, 8].map((count, stack) => <group key={count} position-x={(stack - 1) * 0.8}>{Array.from({ length: count }, (_, coin) => <mesh key={coin} position-y={coin * 0.12 - 0.65}><cylinderGeometry args={[0.3, 0.3, 0.1, 24]} /><meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.35} metalness={0.6} roughness={0.28} /></mesh>)}</group>)}{Array.from({ length: 24 }, (_, index) => <mesh key={index} ref={node => { sparkles.current[index] = node; }}><sphereGeometry args={[0.025, 8, 8]} /><meshBasicMaterial color="#fde68a" transparent /></mesh>)}</group>;
}

function GoldenOrbit() {
  const orbit = useRef<Group>(null);
  const star1 = useRef<Mesh>(null);
  const star2 = useRef<Mesh>(null);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (orbit.current) orbit.current.rotation.z += delta * 0.45;
    [star1.current, star2.current].forEach((star, index) => {
      if (!star) return;
      const phase = (t * 0.22 + index * 0.5) % 1;
      star.position.set(-2 + phase * 4, 1 - phase * 2 + index * 0.5, -0.2);
      (star.material as MeshBasicMaterial).opacity = Math.sin(phase * Math.PI) * 0.7;
    });
  });
  return <group><mesh><octahedronGeometry args={[0.28, 0]} /><meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.9} /></mesh><mesh rotation={[1.1, 0.2, 0.35]}><torusGeometry args={[1.15, 0.025, 10, 80]} /><meshBasicMaterial color="#fbbf24" transparent opacity={0.65} /></mesh><group ref={orbit}>{[0, 1, 2].map(index => <mesh key={index} position={[Math.cos(index * 2.094) * 1.15, Math.sin(index * 2.094) * 1.15, 0]}><sphereGeometry args={[0.075, 12, 12]} /><meshBasicMaterial color="#fde68a" /></mesh>)}</group><mesh ref={star1} scale={[0.35, 0.025, 0.025]}><sphereGeometry args={[1, 12, 12]} /><meshBasicMaterial color="#fef3c7" transparent blending={AdditiveBlending} /></mesh><mesh ref={star2} scale={[0.3, 0.02, 0.02]}><sphereGeometry args={[1, 12, 12]} /><meshBasicMaterial color="#fbbf24" transparent blending={AdditiveBlending} /></mesh></group>;
}

function RadarScene() {
  const sweep = useRef<Mesh>(null);
  const blips = useRef<(MeshStandardMaterial | null)[]>([]);
  const angles = [0.35, 2.25, 4.7];
  useFrame((_, delta) => {
    if (!sweep.current) return;
    sweep.current.rotation.z -= delta * 0.8;
    const rotation = ((-sweep.current.rotation.z % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    blips.current.forEach((material, index) => {
      if (!material) return;
      const difference = Math.abs(Math.atan2(Math.sin(rotation - angles[index]), Math.cos(rotation - angles[index])));
      material.emissiveIntensity = difference < 0.35 ? 2.4 : 0.45;
    });
  });
  return <group>{[0.95, 0.62, 0.3].map(radius => <mesh key={radius}><torusGeometry args={[radius, 0.012, 8, 64]} /><meshBasicMaterial color="#22d3ee" transparent opacity={0.55} /></mesh>)}<mesh scale={[2, 0.01, 1]}><planeGeometry args={[1, 1]} /><meshBasicMaterial color="#67e8f9" transparent opacity={0.28} /></mesh><mesh scale={[0.01, 2, 1]}><planeGeometry args={[1, 1]} /><meshBasicMaterial color="#67e8f9" transparent opacity={0.28} /></mesh><mesh ref={sweep}><circleGeometry args={[0.95, 48, 0, Math.PI / 3]} /><meshBasicMaterial color="#22d3ee" transparent opacity={0.14} side={2} depthWrite={false} /></mesh>{angles.map((angle, index) => <mesh key={angle} position={[Math.cos(angle) * (0.38 + index * 0.19), Math.sin(angle) * (0.38 + index * 0.19), 0.08]}><sphereGeometry args={[0.055, 14, 14]} /><meshStandardMaterial ref={node => { blips.current[index] = node; }} color="#67e8f9" emissive="#22d3ee" emissiveIntensity={0.5} /></mesh>)}</group>;
}

function Scene({ store }: { store: SceneStore }) {
  const { size } = useThree();
  const mobile = size.width < 768;
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} color="#e0f2fe" />
      <pointLight position={[0, 1, 3]} intensity={30} distance={16} color="#38bdf8" />
      <pointLight position={[-6, -2, -5]} intensity={22} distance={16} color="#8b5cf6" />
      <CameraRig store={store} />
      <Aurora store={store} />
      <DustField store={store} mobile={mobile} />
      <StarField mobile={mobile} />
      {!mobile && <ScrollRibbon store={store} />}
      <HeroRig store={store} mobile={mobile} />
      <AccentRig id="problem" store={store} mobile={mobile} anchor={[2.7, 0.2]}><ShatterField /></AccentRig>
      <AccentRig id="services" store={store} mobile={mobile} anchor={[-2.9, 0.8]}><PlatformCity /></AccentRig>
      <AccentRig id="workflow" store={store} mobile={mobile} anchor={[2.6, -0.2]}><RocketPath /></AccentRig>
      <AccentRig id="compare" store={store} mobile={mobile} anchor={[-2.8, 0.2]}><ArenaScene /></AccentRig>
      <AccentRig id="pricing" store={store} mobile={mobile} anchor={[2.7, -0.1]}><CoinStacks /></AccentRig>
      <AccentRig id="testimonials" store={store} mobile={mobile} anchor={[-2.8, 0.25]}><GoldenOrbit /></AccentRig>
      <AccentRig id="contact" store={store} mobile={mobile} anchor={[2.6, 0.5]}><RadarScene /></AccentRig>
    </>
  );
}

export default function GlobalScene() {
  const store = useMemo<SceneStore>(() => ({
    scrollY: 0,
    scrollProgress: 0,
    scrollVelocity: 0,
    vw: window.innerWidth,
    vh: window.innerHeight,
    active: 'hero',
    heroProgress: 1,
    pointer: { x: 0, y: 0 },
    sections: {},
  }), []);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    const update = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - vh;
      store.scrollVelocity = clamp01(Math.abs(scrollY - lastY) / Math.max(1, now - lastTime) * 0.55);
      store.scrollY = scrollY;
      store.scrollProgress = documentHeight > 0 ? clamp01(scrollY / documentHeight) : 0;
      store.vw = vw;
      store.vh = vh;
      store.heroProgress = clamp01(1 - scrollY / (vh * 0.75));
      let active: SceneKey = 'hero';
      let highest = store.heroProgress;
      document.querySelectorAll<HTMLElement>('[data-scene]').forEach(element => {
        const id = element.dataset.scene as SceneKey;
        if (!id || id === 'hero' || !SCENE_IDS.includes(id)) return;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 - vw / 2;
        const centerY = rect.top + rect.height / 2 - vh / 2;
        const overlap = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        const visibility = clamp01(overlap / Math.min(vh, Math.max(1, rect.height)));
        store.sections[id] = { x: centerX, y: centerY, visible: visibility };
        if (visibility > highest) { highest = visibility; active = id; }
      });
      store.active = active;
      lastY = scrollY;
      lastTime = now;
    };
    const pointer = (event: PointerEvent) => {
      store.pointer.x = event.clientX / window.innerWidth - 0.5;
      store.pointer.y = event.clientY / window.innerHeight - 0.5;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('pointermove', pointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('pointermove', pointer);
    };
  }, [store]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10.7], fov: 50 }}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene store={store} />
    </Canvas>
  );
}
