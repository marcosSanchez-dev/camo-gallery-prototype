import { useState, useEffect } from "react";
import { ArrowUpTrayIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function UploadForm({ onSubmit }) {
  const [baseImage, setBaseImage] = useState(null);
  const [social, setSocial] = useState("");
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [enhancedPreview, setEnhancedPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBaseImage(url);
  };

  useEffect(() => {
    if (autoEnhance && baseImage) {
      // Simular generación de imagen mejorada con un filtro visual
      setEnhancedPreview(baseImage + "#enhanced");
    } else {
      setEnhancedPreview(null);
    }
  }, [autoEnhance, baseImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!baseImage || (autoEnhance && !enhancedPreview)) {
      alert("Please upload an image to compare.");
      return;
    }

    const newEntry = {
      before: baseImage,
      after: enhancedPreview || baseImage,
      social,
      autoEnhance,
      likes: Math.floor(Math.random() * 1000),
      score: Math.random().toFixed(2),
      timestamp: Date.now(),
    };

    onSubmit(newEntry);
    setBaseImage(null);
    setEnhancedPreview(null);
    setSocial("");
    setAutoEnhance(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white/5 text-white backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl space-y-6"
    >
      <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
        Upload Your Comparison
      </h2>

      <input
        type="text"
        value={social}
        onChange={(e) => setSocial(e.target.value)}
        placeholder="@socialhandle (optional)"
        className="w-full bg-white/10 text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />

      {/* Imagen base + vista previa */}
      <div className="grid grid-cols-2 gap-4">
        {/* Before */}
        <label
          className={`group flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 border ${
            !baseImage ? "border-red-500" : "border-green-500"
          } rounded-2xl aspect-square cursor-pointer transition-all`}
        >
          {baseImage ? (
            <img
              src={baseImage}
              alt="Before"
              className="object-cover rounded-2xl w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center text-sm text-white/60">
              <ArrowUpTrayIcon className="w-6 h-6 mb-1" />
              <span>Upload Image</span>
              <span className="text-xs mt-1">Original version</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        {/* After (simulado si Enhance activo) */}
        <div className="relative group bg-white/10 border border-white/20 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
          {enhancedPreview ? (
            <img
              src={baseImage}
              alt="Enhanced"
              className="object-cover w-full h-full rounded-2xl brightness-110 contrast-110 saturate-150"
            />
          ) : (
            <div className="text-white/40 text-sm text-center">
              Auto-Enhance disabled
            </div>
          )}
          {autoEnhance && (
            <div className="absolute top-2 right-2 text-xs bg-cyan-500 text-white px-2 py-1 rounded-full shadow">
              Enhanced!
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/80">Apply Camo Auto-Enhance</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={autoEnhance}
            onChange={() => setAutoEnhance(!autoEnhance)}
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-cyan-500 transition-all"></div>
          <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-b from-white/10 to-white/5 hover:from-white/20 text-white font-semibold text-lg py-3 rounded-xl transition-all duration-200 shadow-md"
      >
        Compare Now
      </button>

      <p className="text-center text-white/50 text-xs mt-2">
        JPG / PNG – Max 5MB
      </p>
    </form>
  );
}
