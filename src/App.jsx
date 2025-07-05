import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Gallery />
      </main>
    </div>
  );
}

export default App;
