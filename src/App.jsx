import { useState } from "react";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";
import EngagementPanel from "./components/EngagementPanel";

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedForCompare, setSelectedForCompare] = useState(null);
  const [currentScene, setCurrentScene] = useState("gallery");

  const handleNewSubmission = (data) => {
    setSubmissions([data, ...submissions]);
    setSelectedForCompare(data);
    setCurrentScene("compare");
  };

  const handleSelectCard = (item) => {
    setSelectedForCompare(item);
    setCurrentScene("compare");
  };

  const goToUpload = () => setCurrentScene("upload");
  const goToGallery = () => setCurrentScene("gallery");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] text-white font-inter">
      <Navbar goToUpload={goToUpload} goToGallery={goToGallery} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12 transition-all duration-500">
        {/* ESCENA 1: GALLERY */}
        {currentScene === "gallery" && (
          <Gallery
            items={submissions}
            onSelect={handleSelectCard}
            onUploadClick={goToUpload}
          />
        )}

        {/* ESCENA 2: FORMULARIO */}
        {currentScene === "upload" && (
          <UploadForm onSubmit={handleNewSubmission} onCancel={goToGallery} />
        )}

        {/* ESCENA 3: COMPARADOR */}
        {currentScene === "compare" && (
          <EngagementPanel entry={selectedForCompare} onBack={goToGallery} />
        )}
      </main>
    </div>
  );
}
export default App;
