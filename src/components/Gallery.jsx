import GalleryCard from "./GalleryCard";

export default function Gallery({ items = [] }) {
  return (
    <section className="relative rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Discovery
        </h2>
        <div className="flex gap-2 text-sm">
          <button className="px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20">
            Popular
          </button>
          <button className="px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20">
            Recent
          </button>
          <button className="px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20">
            Top Rated
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-white/50 text-center">
          No submissions yet. Be the first to share your transformation!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <GalleryCard key={index} data={item} />
          ))}
        </div>
      )}
    </section>
  );
}
