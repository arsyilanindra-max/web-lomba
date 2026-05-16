export default function MeshGradientBackground({ children, className = '' }) {
  return (
    <div className={`mesh-gradient-root relative overflow-hidden ${className}`}>
      <div className="mesh-gradient-bg" aria-hidden="true">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
      </div>
      <div className="mesh-gradient-content">
        {children}
      </div>
    </div>
  );
}