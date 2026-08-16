export default function BackgroundEnvironment() {
  return (
    <div className="bg-environment" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ice-50 via-pearl to-white" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(14,165,233,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-ice-300/30 blur-3xl float-slow" />
      <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-violet-glow/20 blur-3xl float" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-mint-glow/15 blur-3xl float-slow float-delay-2" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-pink-accent/10 blur-3xl float float-delay-3" />
      <div className="absolute top-10 right-1/4 w-64 h-64 rounded-full bg-cyan-glow/15 blur-3xl float-slow float-delay-4" />
    </div>
  );
}
