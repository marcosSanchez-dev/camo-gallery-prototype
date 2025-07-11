export default function Navbar({ goToUpload, goToGallery }) {
  // Obtener la ruta actual sin useLocation
  const currentPath = window.location.pathname;

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-[#0f172a] to-[#1e293b] flex justify-between items-center border-b border-white/10 backdrop-blur-lg shadow-[0_0_20px_rgba(99,102,241,0.3)] relative">
      {/* Efecto de borde luminoso */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

      {/* Logo con efecto neón */}
      <button
        onClick={goToGallery}
        className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity group"
      >
        <div className="flex items-center gap-2">
          {/* Logo Camo */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.5)]">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span>Camo Community</span>
        </div>
      </button>

      {/* Botones de navegación */}
      <div className="flex gap-1 bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/5">
        <button
          onClick={goToGallery}
          className={`px-5 py-2 rounded-full transition-all duration-200 ${
            currentPath === "/gallery"
              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white shadow-[0_0_8px_rgba(139,92,246,0.4)]"
              : "bg-transparent text-white/70 hover:text-white"
          }`}
        >
          <span
            className={`text-sm font-medium ${
              currentPath === "/gallery" ? "text-cyan-300" : ""
            }`}
          >
            Gallery
          </span>
        </button>
        <button
          onClick={goToUpload}
          className={`px-5 py-2 rounded-full transition-all duration-200 ${
            currentPath === "/upload"
              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white shadow-[0_0_8px_rgba(139,92,246,0.4)]"
              : "bg-transparent text-white/70 hover:text-white"
          }`}
        >
          <span
            className={`text-sm font-medium ${
              currentPath === "/upload" ? "text-cyan-300" : ""
            }`}
          >
            Upload
          </span>
        </button>
      </div>
    </nav>
  );
}
