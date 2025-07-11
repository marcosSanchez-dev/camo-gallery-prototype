import { useLocation } from "react-router-dom";

export default function Navbar({ goToUpload, goToGallery }) {
  // Simulamos ruta actual
  const currentPath = window.location.pathname;

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-[#1e293b] to-[#3b0764] flex justify-between items-center shadow-md text-white font-semibold">
      <button onClick={goToGallery} className="text-xl hover:underline">
        Camo Gallery
      </button>

      <div className="flex gap-6 text-sm">
        <button
          onClick={goToGallery}
          className={`hover:underline ${
            currentPath === "/gallery" ? "text-cyan-300" : ""
          }`}
        >
          Gallery
        </button>
        <button
          onClick={goToUpload}
          className={`hover:underline ${
            currentPath === "/upload" ? "text-cyan-300" : ""
          }`}
        >
          Upload
        </button>
      </div>
    </nav>
  );
}
