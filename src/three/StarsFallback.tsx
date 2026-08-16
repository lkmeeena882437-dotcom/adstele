export default function StarsFallback() {
  // Pure-CSS starfield used while the 3D chunk loads,
  // and as the permanent fallback for reduced-motion / no-WebGL devices.
  return <div className="stars opacity-70" aria-hidden="true" />;
}
