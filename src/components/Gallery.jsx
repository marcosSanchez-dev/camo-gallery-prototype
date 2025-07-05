import GalleryCard from "./GalleryCard";

export default function Gallery({ items = [] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Before / After Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <GalleryCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
}
