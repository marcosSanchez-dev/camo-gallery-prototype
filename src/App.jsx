import { useState } from "react";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";
import EngagementPanel from "./components/EngagementPanel";
import SceneWrapper from "./components/SceneWrapper";
import mockSubmissions from "./mockSubmissions";
import { AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white font-inter relative overflow-hidden">
      {/* Efecto de partículas sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/10 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Efecto de borde luminoso */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(139,92,246,0.2)]" />

      {/* Efecto de luz radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-radial-gradient(at center, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 70%) pointer-events-none" />

      <Navbar goToUpload={goToUpload} goToGallery={goToGallery} />

      <main className="relative max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-100px)]">
        <AnimatePresence mode="wait">
          {/* ESCENA 1: GALLERY */}
          <SceneWrapper key="gallery" isActive={currentScene === "gallery"}>
            <Gallery
              items={submissions}
              onSelect={handleSelectCard}
              onUploadClick={goToUpload}
            />
          </SceneWrapper>

          {/* ESCENA 2: UPLOAD */}
          <SceneWrapper key="upload" isActive={currentScene === "upload"}>
            <div className="flex items-center justify-center min-h-[70vh] py-12">
              <UploadForm
                onSubmit={handleNewSubmission}
                onCancel={goToGallery}
              />
            </div>
          </SceneWrapper>

          {/* ESCENA 3: COMPARADOR */}
          <SceneWrapper key="compare" isActive={currentScene === "compare"}>
            <div className="flex items-center justify-center min-h-[70vh] py-12">
              <EngagementPanel
                entry={selectedForCompare}
                onBack={goToGallery}
              />
            </div>
          </SceneWrapper>
        </AnimatePresence>
      </main>

      {/* Footer minimalista */}
      <footer className="py-6 text-center text-white/50 text-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Camo Community Gallery. All rights
            reserved.
          </p>
          <p className="mt-2">Transforming images with cinematic precision</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
