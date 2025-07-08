export default function GalleryCard({ data, onClick }) {
  const { before, after, social, likes } = data;
  const views = Math.floor((likes || 0) * 3.5 + 100); // Simula views como 3.5x likes + base

  return (
    <div
      className="relative group overflow-hidden rounded-xl shadow-md border border-white/10 backdrop-blur-sm bg-white/5 hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={() => onClick?.(data)}
    >
      <div className="relative">
        <img
          src={before}
          alt="Before"
          className="w-full aspect-square object-cover rounded-t-xl"
        />
        <img
          src={after}
          alt="After"
          className="w-full aspect-square object-cover rounded-b-xl -mt-1"
        />
      </div>

      {/* Overlay en hover */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
        <div className="text-sm text-white/70 font-medium">
          {social || "@anonymous"}
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span>❤️ {likes ?? 0}</span>
          <span>👁️ {views}</span>
        </div>
      </div>
    </div>
  );
}
