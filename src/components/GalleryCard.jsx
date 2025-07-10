export default function GalleryCard({ data, onClick }) {
  const { before, after, username, likes, views, filter } = data;

  return (
    <div
      className="relative group overflow-hidden rounded-xl shadow-md border border-white/10 backdrop-blur-sm bg-white/5 hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={() => onClick?.(data)}
    >
      <div className="relative">
        {/* Imagen before */}
        <img
          src={before}
          alt="Before"
          className="w-full aspect-square object-cover rounded-t-xl"
        />

        {/* Imagen after con filtro */}
        <img
          src={after}
          alt="After"
          className="w-full aspect-square object-cover rounded-b-xl -mt-1"
          style={{ filter }} // Aplica el filtro CSS directamente
        />
      </div>

      {/* Overlay en hover */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
        <div className="text-sm text-white/70 font-medium">
          {username || "@anonymous"}
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span>❤️ {likes ?? 0}</span>
          <span>👁️ {views ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
