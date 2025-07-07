export default function GalleryCard({ data, onClick }) {
  const { before, after, social } = data;

  return (
    <div
      className="relative group overflow-hidden rounded-xl shadow-md border border-white/10 backdrop-blur-sm bg-white/5 hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={() => onClick?.(data)} // <- activamos selección si se provee la función
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
        <div className="text-sm text-white/70 font-medium">{social}</div>
        <div className="flex justify-between text-sm font-semibold">
          <span>❤️ 2.4K</span>
          <span>👁️ 8.7K</span>
        </div>
      </div>
    </div>
  );
}
