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
  Points,
  PointsMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import ConstellationGroup from './Constellation';
import { SCENE_THEMES } from '../data/content';

/* ============================================================
   GLOBAL 3D ENVIRONMENT — one WebGL canvas for the whole page.

   - Hero: "Ad Constellation" (orbiting platform nodes + core)
   - Problem:   fractured rose wireframe with leaking bits
   - Services:  gyroscope of three platform rings
   - Workflow:  comet tracing a lissajous light-trail
   - Pricing:   ascending glowing growth bars
   - Contact:   pulsing signal rings

   Aurora glow + particle tints lerp to each section's palette
   as you scroll. Accents travel WITH their section (screen-
   space mapping) and hide off-screen. Mobile: accents off,
   particles reduced. All procedural — zero external assets.
   ============================================================ */

type SceneKey = keyof typeof SCENE_THEMES;

interface SceneStore {
  scrollY: number;
  vw: number;
  vh: number;
  active: SceneKey;
  heroProgress: number;
  pointer: { x: number; y: number };
  sections: Record<string, { x: number; y: number; visible: number }>;
}

const SCENE_IDS = ['problem', 'services', 'workflow', 'pricing', 'contact'] as const;
const ZERO_OFFSET = { x: 0, y: 0, visible: 0 };
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* ---------- procedural textures ---------- */

function makeAuroraTexture(): CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.6)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.18)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
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

/* ---------- camera parallax ---------- */

function CameraRig({ store }: { store: SceneStore }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 3);
    camera.position.x += (store.pointer.x * 0.7 - camera.position.x) * k;
    camera.position.y += (-store.pointer.y * 0.5 - camera.position.y) * k;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------- hero constellation rig ---------- */

function HeroRig({ store, isMobile }: { store: SceneStore; isMobile: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const t = store.heroProgress;
    const k = 1 - Math.exp(-delta * 3);
    const targetScale = isMobile ? 0.55 + 0.45 * t : 0.6 + 0.4 * t;
    g.position.y += (isMobile ? -2.0 - g.position.y : -2.15 - g.position.y) * k;
    g.position.x += (store.pointer.x * 0.35 - g.position.x) * k * 0.5;
    const s = g.scale.x + (targetScale - g.scale.x) * k;
    g.scale.setScalar(Math.max(0.001, s));
    g.rotation.y += delta * 0.02 * t;
  });

  return (
    <group ref={group}>
      <ConstellationGroup />
    </group>
  );
}

/* ---------- aurora glow (per-section palette) ---------- */

function Aurora({ store }: { store: SceneStore }) {
  const texture = useMemo(() => makeAuroraTexture(), []);
  const sprites = useRef<(Sprite | null)[]>([]);
  const mats = useRef<(SpriteMaterial | null)[]>([]);
  const bases = useMemo(
    () => [new Vector3(-4.4, 2.6, -2.5), new Vector3(4.6, -2.8, -2.5), new Vector3(0.6, 3.4, -3.5)],
    []
  );
  const scales = [9.5, 10.5, 8.5];
  const tmp = useMemo(() => new Color(), []);

  useFrame((state, delta) => {
    const theme = SCENE_THEMES[store.active];
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-delta * 2);
    const targetOp = 0.5 - 0.18 * store.heroProgress; // stronger wash on light sections
    sprites.current.forEach((s, i) => {
      if (!s) return;
      s.position.set(
        bases[i].x + Math.sin(t * 0.06 + i * 1.7) * 0.4,
        bases[i].y + Math.cos(t * 0.05 + i * 0.9) * 0.3,
        bases[i].z
      );
      const m = mats.current[i];
      if (m) {
        tmp.set(theme.aurora[i]);
        m.color.lerp(tmp, k);
        m.opacity += (targetOp - m.opacity) * k;
      }
    });
  });

  return (
    <group>
      {bases.map((v, i) => (
        <sprite
          key={i}
          ref={el => {
            if (el) sprites.current[i] = el;
          }}
          position={v}
          scale={[scales[i], scales[i], 1]}
        >
          <spriteMaterial
            ref={el => {
              if (el) mats.current[i] = el;
            }}
            map={texture}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}

/* ---------- particle fields ---------- */

function DustField({ store, isMobile }: { store: SceneStore; isMobile: boolean }) {
  const tmp = useMemo(() => new Color(), []);
  const points = useMemo(() => {
    const count = isMobile ? 130 : 340;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = -1 + (Math.random() - 0.5) * 6;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const material = new PointsMaterial({
      size: 0.05,
      map: makeDotTexture(),
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      color: '#cbd5e1',
      sizeAttenuation: true,
    });
    const pts = new Points(geometry, material);
    pts.frustumCulled = false;
    return pts;
  }, [isMobile]);

  useFrame((_, delta) => {
    points.rotation.y += delta * 0.012;
    tmp.set(SCENE_THEMES[store.active].dust);
    const material = points.material as PointsMaterial;
    material.color.lerp(tmp, 1 - Math.exp(-delta * 2.5));
    material.opacity += (0.32 - 0.1 * store.heroProgress - material.opacity) * (1 - Math.exp(-delta * 2.5));
  });

  return <primitive object={points} />;
}

function StarField({ isMobile }: { isMobile: boolean }) {
  const points = useMemo(() => {
    const count = isMobile ? 90 : 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const material = new PointsMaterial({
      size: 0.035,
      map: makeDotTexture(),
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: AdditiveBlending,
      color: '#bae6fd',
      sizeAttenuation: true,
    });
    const pts = new Points(geometry, material);
    pts.frustumCulled = false;
    return pts;
  }, [isMobile]);

  useFrame((_, delta) => {
    points.rotation.y += delta * 0.018;
  });

  return <primitive object={points} />;
}

/* ---------- per-section accent rig (travels with its section) ---------- */

function AccentRig({
  id,
  store,
  isMobile,
  anchor,
  children,
}: {
  id: string;
  store: SceneStore;
  isMobile: boolean;
  anchor: [number, number];
  children: ReactNode;
}) {
  const group = useRef<Group>(null);
  const { size, camera } = useThree();

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const off = store.sections[id] ?? ZERO_OFFSET;
    const k = 1 - Math.exp(-delta * 4);
    const aspect = size.width / Math.max(1, size.height);
    const halfH = Math.tan(((camera as { fov?: number }).fov! / 2) * (Math.PI / 180)) * camera.position.z;
    const halfW = halfH * aspect;
    const tx = (off.x / Math.max(1, store.vw)) * 2 * halfW + anchor[0];
    const ty = -(off.y / Math.max(1, store.vh)) * 2 * halfH + anchor[1];
    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty - g.position.y) * k;
    const targetScale = isMobile ? 0 : 0.001 + 0.999 * off.visible;
    const s = g.scale.x + (targetScale - g.scale.x) * k;
    g.scale.setScalar(Math.max(0.001, s));
  });

  return <group ref={group}>{children}</group>;
}

/* ---------- accent scenes ---------- */

function FractureScene() {
  const wire = useRef<Mesh>(null);
  const bits = useRef<(Mesh | null)[]>([]);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (wire.current) {
      wire.current.rotation.y += 0.004;
      wire.current.rotation.x = Math.sin(t * 0.3) * 0.25;
    }
    bits.current.forEach((b, i) => {
      if (!b) return;
      const ph = (t * 0.5 + i * 0.31) % 1;
      b.position.y = 1.1 - ph * 2.2;
      b.position.x = Math.sin(ph * Math.PI * 2 + i) * 0.25;
      const m = b.material as MeshBasicMaterial;
      m.opacity = Math.sin(ph * Math.PI) * 0.7;
    });
  });

  return (
    <group>
      <mesh ref={wire}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
      {[0, 1, 2, 3].map(i => (
        <mesh
          key={i}
          ref={el => {
            if (el) bits.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

function GyroScene() {
  const r1 = useRef<Mesh>(null);
  const r2 = useRef<Mesh>(null);
  const r3 = useRef<Mesh>(null);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (r1.current) r1.current.rotation.set(t * 0.5, t * 0.3, 0);
    if (r2.current) r2.current.rotation.set(t * 0.4, -t * 0.5, t * 0.2);
    if (r3.current) r3.current.rotation.set(-t * 0.35, t * 0.25, t * 0.45);
  });

  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[0.95, 0.028, 12, 96]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[0.72, 0.024, 12, 96]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.55} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[0.5, 0.02, 12, 96]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function CometScene() {
  const trail = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(28 * 3), 3));
    const material = new LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0.45 });
    const line = new Line(geometry, material);
    line.frustumCulled = false;
    return line;
  }, []);
  const comet = useRef<Mesh>(null);
  const time = useRef(0);
  const tmpV = useMemo(() => new Vector3(), []);
  const lissajous = (t: number) =>
    tmpV.set(Math.sin(t) * 1.5, Math.sin(t * 1.6 + 0.9) * 0.95, Math.sin(t * 0.6 + 0.4) * 0.55);

  useFrame((_, delta) => {
    time.current += delta * 0.5;
    const attr = trail.geometry.getAttribute('position') as BufferAttribute;
    for (let i = 0; i < 28; i++) {
      const p = lissajous(time.current - i * 0.06);
      attr.setXYZ(i, p.x, p.y, p.z);
    }
    attr.needsUpdate = true;
    const head = lissajous(time.current);
    if (comet.current) comet.current.position.copy(head);
  });

  return (
    <group>
      <primitive object={trail} />
      <mesh ref={comet}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function GrowthBarsScene() {
  const group = useRef<Group>(null);
  const bars = useRef<(Mesh | null)[]>([]);
  const heights = [0.35, 0.55, 0.8, 1.1, 1.45];

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.3;
    bars.current.forEach((b, i) => {
      if (b) b.position.y = heights[i] / 2 + Math.sin(t * 1.1 + i * 0.7) * 0.05;
    });
  });

  return (
    <group ref={group} rotation={[0.12, -0.4, 0]}>
      {heights.map((h, i) => (
        <mesh
          key={i}
          ref={el => {
            if (el) bars.current[i] = el;
          }}
          position={[(i - 2) * 0.34, h / 2, 0]}
        >
          <boxGeometry args={[0.26, h, 0.26]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.55} metalness={0.3} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function SignalScene() {
  const rings = useRef<(Mesh | null)[]>([]);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    rings.current.forEach((r, i) => {
      if (!r) return;
      const ph = (t * 0.45 + i / 3) % 1;
      r.scale.setScalar(0.3 + ph * 2.0);
      const m = r.material as MeshBasicMaterial;
      m.opacity = (1 - ph) * 0.55;
    });
  });

  return (
    <group>
      {[0, 1, 2].map(i => (
        <mesh
          key={i}
          ref={el => {
            if (el) rings.current[i] = el;
          }}
        >
          <torusGeometry args={[0.32, 0.012, 8, 64]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} depthWrite={false} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0ea5e9" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

/* ---------- scene assembly ---------- */

function Scene({ store }: { store: SceneStore }) {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} color="#e0f2fe" />
      <pointLight position={[0, 1, 3]} intensity={30} distance={16} decay={2} color="#38bdf8" />
      <pointLight position={[-6, -2, -5]} intensity={22} distance={14} decay={2} color="#8b5cf6" />

      <CameraRig store={store} />
      <Aurora store={store} />
      <DustField store={store} isMobile={isMobile} />
      <StarField isMobile={isMobile} />
      <HeroRig store={store} isMobile={isMobile} />

      <AccentRig id="problem" store={store} isMobile={isMobile} anchor={[2.7, 0.2]}>
        <FractureScene />
      </AccentRig>
      <AccentRig id="services" store={store} isMobile={isMobile} anchor={[-2.9, 0.8]}>
        <GyroScene />
      </AccentRig>
      <AccentRig id="workflow" store={store} isMobile={isMobile} anchor={[2.6, -0.2]}>
        <CometScene />
      </AccentRig>
      <AccentRig id="pricing" store={store} isMobile={isMobile} anchor={[-2.8, -0.2]}>
        <GrowthBarsScene />
      </AccentRig>
      <AccentRig id="contact" store={store} isMobile={isMobile} anchor={[2.5, 0.6]}>
        <SignalScene />
      </AccentRig>
    </>
  );
}

export default function GlobalScene() {
  const store = useMemo<SceneStore>(
    () => ({
      scrollY: 0,
      vw: window.innerWidth,
      vh: window.innerHeight,
      active: 'hero',
      heroProgress: 1,
      pointer: { x: 0, y: 0 },
      sections: {},
    }),
    []
  );

  useEffect(() => {
    const elements: Record<string, HTMLElement> = {};
    SCENE_IDS.forEach(id => {
      const el = document.querySelector<HTMLElement>(`[data-scene="${id}"]`);
      if (el) elements[id] = el;
    });

    const update = () => {
      const sy = window.scrollY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      store.scrollY = sy;
      store.vw = vw;
      store.vh = vh;
      store.heroProgress = clamp01(1 - sy / (vh * 0.75));

      let best: SceneKey = 'hero';
      let bestValue = store.heroProgress;
      SCENE_IDS.forEach(id => {
        const el = elements[id];
        if (!el) {
          store.sections[id] = { ...ZERO_OFFSET };
          return;
        }
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - vw / 2;
        const y = rect.top + rect.height / 2 - vh / 2;
        const visible = clamp01(1 - Math.abs(y) / (vh * 0.62));
        store.sections[id] = { x, y, visible };
        if (visible > bestValue) {
          bestValue = visible;
          best = id;
        }
      });
      store.active = best;
    };

    const onPointerMove = (e: PointerEvent) => {
      store.pointer.x = e.clientX / window.innerWidth - 0.5;
      store.pointer.y = e.clientY / window.innerHeight - 0.5;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [store]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 50 }}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene store={store} />
    </Canvas>
  );
}
