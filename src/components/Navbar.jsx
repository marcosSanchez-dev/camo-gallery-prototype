export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur border-b border-white/10 text-white">
      <h1 className="text-2xl font-bold">Camo Gallery</h1>
      <div className="space-x-4">
        <a href="#" className="hover:underline">
          Gallery
        </a>
        <a href="#" className="hover:underline">
          Upload
        </a>
      </div>
    </nav>
  );
}
