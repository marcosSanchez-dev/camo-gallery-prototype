export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Camo Gallery</h1>
        <div className="space-x-4">
          <button className="text-sm font-medium hover:underline">
            Gallery
          </button>
          <button className="text-sm font-medium hover:underline">
            Upload
          </button>
        </div>
      </div>
    </nav>
  );
}
