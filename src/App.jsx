import { useState } from "react";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";
import EngagementPanel from "./components/EngagementPanel"; // 👈 nueva línea

function App() {
  const [submissions, setSubmissions] = useState([]);

  const handleNewSubmission = (data) => {
    setSubmissions([data, ...submissions]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] text-white font-inter">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <UploadForm onSubmit={handleNewSubmission} />
        <Gallery items={submissions} />
        <EngagementPanel
          before={submissions[0]?.before}
          after={submissions[0]?.after}
        />{" "}
        {/* 👈 nuevo panel agregado aquí */}
      </main>
    </div>
  );
}
export default App;
