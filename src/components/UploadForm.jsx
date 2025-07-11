import { useState, useRef } from "react";
import { ArrowUpTrayIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { enhanceWithAI } from "../utils/camoEnhanceAI";

export default function UploadForm({ onSubmit, onCancel }) {
  const [before, setBefore] = useState(null);
  const [social, setSocial] = useState("");
  const [autoEnhance, setAutoEnhance] = useState(false);
  const [enhanceLoading, setEnhanceLoading] = useState(false);
  const [enhanceResult, setEnhanceResult] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBefore(url);
    setEnhancedImage(null);
    setAutoEnhance(false);
    setEnhanceResult(null);
  };

  const applyEnhancement = (imageSrc, adjustments) => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        const brightness =
          1 + parseInt(adjustments?.brightness || "0", 10) / 100;
        const contrast = 1 + parseInt(adjustments?.contrast || "0", 10) / 100;
        const saturate =
          1 + parseInt(adjustments?.colorCorrection || "0", 10) / 100;

        ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
        ctx.drawImage(img, 0, 0);

        const enhancedDataURL = canvas.toDataURL("image/jpeg", 0.9);
        resolve(enhancedDataURL);
      };

      img.src = imageSrc;
    });
  };

  const handleToggleEnhance = async () => {
    if (!before) {
      alert("Please upload a 'before' image first.");
      return;
    }

    setEnhanceLoading(true);

    try {
      const result = await enhanceWithAI({ imageName: "User Upload" });
      setEnhanceResult(result);

      const enhancedImg = await applyEnhancement(before, result.adjustments);
      setEnhancedImage(enhancedImg);
      setAutoEnhance(true);
    } catch (error) {
      console.error("Enhancement failed:", error);
      alert("Failed to enhance image. Please try again.");
    } finally {
      setEnhanceLoading(false);
    }
  };

  const resetForm = () => {
    setBefore(null);
    setSocial("");
    setAutoEnhance(false);
    setEnhanceLoading(false);
    setEnhanceResult(null);
    setEnhancedImage(null);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!before || !enhancedImage) {
      alert("Please complete the enhancement process first.");
      return;
    }

    const newEntry = {
      before,
      after: enhancedImage,
      enhancedImage,
      filter: null,
      social,
      autoEnhance: true,
      enhanceResult,
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 1000 * 3.5 + 100),
      timestamp: Date.now(),
    };

    onSubmit(newEntry);
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.3)] relative overflow-hidden"
    >
      {/* Efecto de borde luminoso */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_0_15px_rgba(192,132,252,0.4)]" />

      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent relative z-10">
        Upload Your Comparison
      </h2>

      {/* Campo social handle */}
      <div className="relative z-10 mb-8">
        <input
          type="text"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
          placeholder="@socialhandle (optional)"
          className="w-full bg-black/20 text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 backdrop-blur-sm"
        />
      </div>

      {/* Contenedor de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
        {/* BEFORE IMAGE */}
        <label className="group flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm hover:bg-black/30 border border-white/10 rounded-2xl aspect-square cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden">
          {before ? (
            <img
              src={before}
              alt="Before"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center p-6 text-center">
              <div className="p-3 bg-black/30 rounded-full mb-4 border border-white/10">
                <ArrowUpTrayIcon className="w-8 h-8 text-white/70" />
              </div>
              <span className="text-lg font-medium text-white">Before</span>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        {/* AFTER IMAGE */}
        <div className="flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl aspect-square shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden relative">
          {enhancedImage ? (
            <img
              src={enhancedImage}
              alt="After (Enhanced)"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center p-6 text-center">
              <div className="p-3 bg-black/30 rounded-full mb-4 border border-white/10">
                <SparklesIcon className="w-8 h-8 text-white/70" />
              </div>
              <span className="text-lg font-medium text-white">After</span>
              <span className="text-sm mt-2 text-white/60 max-w-[80%] mx-auto">
                {before
                  ? "Click 'Enhance Now' to generate result"
                  : "Upload a 'Before' image first"}
              </span>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Botón Enhance - Centrado y más prominente */}
      <div className="flex justify-center mb-8 relative z-10">
        <button
          type="button"
          disabled={enhanceLoading || !before || autoEnhance}
          onClick={handleToggleEnhance}
          className={`px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
            autoEnhance
              ? "bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-500/30 cursor-default"
              : "bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          } ${enhanceLoading ? "animate-pulse" : ""}`}
        >
          <div className="flex items-center justify-center gap-3 min-w-[180px]">
            {enhanceLoading ? (
              <>
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : autoEnhance ? (
              <div className="flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2" />
                Enhanced
              </div>
            ) : (
              <div className="flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2" />
                Enhance Now
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Panel de ajustes */}
      {enhanceResult?.adjustments && (
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-5 relative z-10 mb-8">
          <p className="mb-4 font-semibold text-lg bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Enhancement Applied:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(enhanceResult.adjustments).map(([key, value]) => (
              <div
                key={key}
                className="bg-black/30 rounded-lg p-3 border border-white/5"
              >
                <div className="text-sm text-white/60 capitalize">{key}</div>
                <div className="text-lg font-medium text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-5 relative z-10">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white font-medium py-3.5 rounded-xl transition-all duration-300 border border-white/10 shadow hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!enhancedImage}
          className={`flex-1 font-semibold text-lg py-3.5 rounded-xl transition-all duration-300 shadow-lg ${
            !enhancedImage
              ? "bg-gray-600/30 cursor-not-allowed text-white/40"
              : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
          }`}
        >
          Compare Now
        </button>
      </div>

      <p className="text-center text-white/50 text-sm mt-6 relative z-10">
        JPG / PNG – Max 5MB
      </p>

      <canvas ref={canvasRef} className="hidden" />
    </form>
  );
}
