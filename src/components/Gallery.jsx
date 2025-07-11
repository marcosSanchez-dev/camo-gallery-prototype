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
    <section className="relative rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl p-6">
      {/* Botón de upload arriba */}
      <div className="text-center mb-6">
        <button
          onClick={onUploadClick}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 rounded-full text-white text-lg shadow-md transition-all"
        >
          Upload Your Comparison
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Discovery
        </h2>
        <div className="flex gap-2 text-sm">
          {["popular", "recent", "top"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === f ? "bg-white/30 font-semibold" : "bg-white/10"
              } hover:bg-white/20 text-white`}
              onClick={() => setFilter(f)}
            >
              {f === "popular"
                ? "Popular"
                : f === "recent"
                ? "Recent"
                : "Top Rated"}
            </button>
          ))}
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <p className="text-white/50 text-center">
          No submissions yet. Be the first to share your transformation!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item, index) => (
            <GalleryCard
              key={index}
              data={item}
              onClick={() => onSelect(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
