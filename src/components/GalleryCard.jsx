export default function GalleryCard({ data }) {
  const { before, after, social } = data;

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <div className="grid grid-cols-2 gap-0">
        <img src={before} alt="Before" className="aspect-video object-cover" />
        <img src={after} alt="After" className="aspect-video object-cover" />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium">{social}</p>
      </div>
    </div>
  );
}
