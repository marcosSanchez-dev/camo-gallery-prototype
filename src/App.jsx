import { useState } from "react";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";

function App() {
  const [submissions, setSubmissions] = useState([]);

  const handleNewSubmission = (data) => {
    setSubmissions([data, ...submissions]); // añade al principio
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <UploadForm onSubmit={handleNewSubmission} />
        <Gallery items={submissions} />
      </main>
    </div>
  );
}

export default App;
