import { useState } from "react";
import GalleryCard from "./GalleryCard";

export default function Gallery({ items = [], onSelect, onUploadClick }) {
  const [filter, setFilter] = useState("recent");

  const getSortedItems = () => {
    switch (filter) {
      case "popular":
        return [...items].sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case "top":
        return [...items].sort((a, b) => (b.score || 0) - (a.score || 0));
      case "recent":
      default:
        return [...items].sort(
          (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
        );
    }
  };

  const sortedItems = getSortedItems();

  return (
    <section className="relative rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.3)] overflow-hidden min-h-[600px]">
      {/* Rim light effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_10px_rgba(192,132,252,0.5)]" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-1">
            Discovery
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
        </div>

        <div className="flex gap-2 bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/5">
          {["popular", "recent", "top"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                filter === f
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                  : "bg-transparent text-white/60 hover:text-white"
              }`}
              onClick={() => setFilter(f)}
            >
              <span
                className={`font-medium ${filter === f ? "text-cyan-300" : ""}`}
              >
                {f === "popular"
                  ? "Popular"
                  : f === "recent"
                  ? "Recent"
                  : "Top Rated"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="relative z-10 py-12 text-center backdrop-blur-sm rounded-xl border border-white/5 bg-black/10">
          <p className="text-white/70 text-lg">
            No submissions yet. Be the first to share your transformation!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-16">
          {sortedItems.map((item, index) => (
            <GalleryCard
              key={index}
              data={item}
              onClick={() => onSelect(item)}
              isFeatured={index === 3} // Ejemplo para destacar un card específico
            />
          ))}
        </div>
      )}

      {/* Botón flotante de upload */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-lg font-medium tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.8)] transition-all duration-300 transform hover:scale-[1.03] group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="relative z-10">Upload</span>
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Efecto de partículas sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
