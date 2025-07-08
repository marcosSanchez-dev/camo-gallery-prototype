export default function Navbar({ goToUpload, goToGallery }) {
  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-[#1e293b] to-[#3b0764] flex justify-between items-center shadow-md text-white font-semibold">
      <button onClick={goToGallery} className="text-xl hover:underline">
        Camo Gallery
      </button>

      <div className="flex gap-6 text-sm">
        <button onClick={goToGallery} className="hover:underline">
          Gallery
        </button>
        <button onClick={goToUpload} className="hover:underline">
          Upload
        </button>
      </div>
    </nav>
  );
}
