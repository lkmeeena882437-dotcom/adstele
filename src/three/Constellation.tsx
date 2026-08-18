import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
import { platformLabels } from './platformLabels';

const PLATFORMS = [
  { name: 'meta', color: '#38bdf8', radius: 3, speed: 0.16, phase: 0, size: 0.26 },
  { name: 'google', color: '#06b6d4', radius: 3.7, speed: -0.12, phase: 2.1, size: 0.24 },
  { name: 'telegram', color: '#8b5cf6', radius: 4.4, speed: 0.09, phase: 4.2, size: 0.26 },
] as const;

const nodePositions = [new Vector3(), new Vector3(), new Vector3()];
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function glowTexture(color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, '#fff');
  gradient.addColorStop(0.14, color);
  gradient.addColorStop(0.45, `${color}44`);
  gradient.addColorStop(1, `${color}00`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new CanvasTexture(canvas);
}

function CoreNode() {
  const solid = useRef<Mesh>(null);
  const wire = useRef<Mesh>(null);
  const glow = useMemo(() => glowTexture('#38bdf8'), []);
  useFrame((_, delta) => {
    if (solid.current) {
      solid.current.rotation.y += delta * 0.14;
      solid.current.rotation.x += delta * 0.05;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.09;
      wire.current.rotation.z += delta * 0.04;
    }
  });
  return (
    <group>
      <mesh ref={solid}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.55} metalness={0.45} roughness={0.25} flatShading />
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

function PlatformNode({ index }: { index: number }) {
  const def = PLATFORMS[index];
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const angle = useRef(def.phase);
  const glow = useMemo(() => glowTexture(def.color), [def.color]);
  const world = useMemo(() => new Vector3(), []);
  const projected = useMemo(() => new Vector3(), []);
  const cameraSpace = useMemo(() => new Vector3(), []);
  const { camera, size } = useThree();

  useFrame((_, delta) => {
    angle.current += delta * def.speed;
    const a = angle.current;
    const x = Math.cos(a) * def.radius;
    const y = Math.sin(a * 1.6 + def.phase) * 0.4;
    const z = Math.sin(a) * def.radius;
    group.current?.position.set(x, y, z);
    if (ring.current) ring.current.rotation.z += delta * 0.65;
    nodePositions[index].set(x, y, z);

    if (!group.current) return;
    group.current.getWorldPosition(world);
    projected.copy(world).project(camera);
    cameraSpace.copy(world).applyMatrix4(camera.matrixWorldInverse);
    const behind = cameraSpace.z >= 0 || projected.z < -1 || projected.z > 1;
    const label = platformLabels[def.name];
    label.x = (projected.x * 0.5 + 0.5) * size.width;
    label.y = (-projected.y * 0.5 + 0.5) * size.height;
    label.o = behind ? 0 : clamp01(1 - projected.z * 0.9);
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[def.size, 24, 24]} />
        <meshStandardMaterial color={def.color} emissive={def.color} emissiveIntensity={0.7} metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh ref={ring} rotation={[1.25, 0, 0.4]}>
        <torusGeometry args={[def.size * 2.2, 0.014, 12, 64]} />
        <meshBasicMaterial color={def.color} transparent opacity={0.55} />
      </mesh>
      <sprite scale={[def.size * 9, def.size * 9, 1]}>
        <spriteMaterial map={glow} color={def.color} transparent opacity={0.5} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
    </group>
  );
}

function ConnectionLines() {
  const curves = useMemo(() => PLATFORMS.map(def => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(49 * 3), 3));
    const material = new LineBasicMaterial({ color: def.color, transparent: true, opacity: 0.3 });
    const line = new Line(geometry, material);
    line.frustumCulled = false;
    return line;
  }), []);

  useFrame(() => {
    nodePositions.forEach((node, index) => {
      const position = curves[index].geometry.getAttribute('position') as BufferAttribute;
      const curve = new QuadraticBezierCurve3(
        new Vector3(),
        new Vector3(node.x * 0.5, node.y + 1.5, node.z * 0.5),
        node,
      );
      curve.getPoints(48).forEach((point, pointIndex) => position.setXYZ(pointIndex, point.x, point.y, point.z));
      position.needsUpdate = true;
    });
  });
  return <group>{curves.map((curve, index) => <primitive key={index} object={curve} />)}</group>;
}

export default function ConstellationGroup() {
  return (
    <group>
      <CoreNode />
      {PLATFORMS.map((platform, index) => <PlatformNode key={platform.name} index={index} />)}
      <ConnectionLines />
    </group>
  );
}
