import { useState } from "react";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";
import EngagementPanel from "./components/EngagementPanel";
import SceneWrapper from "./components/SceneWrapper"; // Importa el nuevo wrapper animado
import mockSubmissions from "./mockSubmissions";

function App() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
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

      <main className="relative max-w-5xl mx-auto px-4 py-8 min-h-[600px] overflow-hidden">
        {/* ESCENA 1: GALLERY */}
        <SceneWrapper isActive={currentScene === "gallery"}>
          <Gallery
            items={submissions}
            onSelect={handleSelectCard}
            onUploadClick={goToUpload}
          />
        </SceneWrapper>

        {/* ESCENA 2: UPLOAD */}
        <SceneWrapper isActive={currentScene === "upload"}>
          <UploadForm onSubmit={handleNewSubmission} onCancel={goToGallery} />
        </SceneWrapper>

        {/* ESCENA 3: COMPARADOR */}
        <SceneWrapper isActive={currentScene === "compare"}>
          <EngagementPanel entry={selectedForCompare} onBack={goToGallery} />
        </SceneWrapper>
      </main>
    </div>
  );
}

export default App;
