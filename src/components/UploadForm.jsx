import { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { enhanceWithAI } from "../utils/camoEnhanceAI";

export default function UploadForm({ onSubmit }) {
  const [before, setBefore] = useState(null);
  const [social, setSocial] = useState("");
  const [autoEnhance, setAutoEnhance] = useState(false);
  const [enhanceLoading, setEnhanceLoading] = useState(false);
  const [enhanceResult, setEnhanceResult] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBefore(url);
  };

  const handleToggleEnhance = async () => {
    if (!before) {
      alert("Please upload a 'before' image first.");
      return;
    }
    setAutoEnhance(true);
    setEnhanceLoading(true);
    const result = await enhanceWithAI({ imageName: "Living Room 1" });
    setEnhanceResult(result);
    setEnhanceLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!before) {
      alert("Please upload an image.");
      return;
    }

    const newEntry = {
      before,
      after: before,
      social,
      autoEnhance,
      enhanceResult,
      likes: Math.floor(Math.random() * 1000),
      score: Math.random().toFixed(2),
      timestamp: Date.now(),
    };

    onSubmit(newEntry);
    setBefore(null);
    setSocial("");
    setAutoEnhance(false);
    setEnhanceResult(null);
  };

  const getEnhanceFilter = () => {
    if (!enhanceResult || !enhanceResult.adjustments) return "none";

    const brightness =
      1 + parseInt(enhanceResult.adjustments.brightness || "0") / 100;
    const contrast =
      1 + parseInt(enhanceResult.adjustments.contrast || "0") / 100;
    const saturate =
      1 + parseInt(enhanceResult.adjustments.colorCorrection || "0") / 100;

    return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white/5 text-white backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl space-y-6"
    >
      <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
        Upload Your Comparison
      </h2>

      <div>
        <input
          type="text"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
          placeholder="@socialhandle (optional)"
          className="w-full bg-white/10 text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* BEFORE IMAGE */}
        <label className="group flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl aspect-square cursor-pointer transition-all">
          {before ? (
            <img
              src={before}
              alt="Before"
              className="object-cover rounded-2xl w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center text-sm text-white/60">
              <ArrowUpTrayIcon className="w-6 h-6 mb-1" />
              <span>Before</span>
              <span className="text-xs mt-1">Upload dim lighting</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        {/* AFTER IMAGE (enhanced preview) */}
        <div className="flex flex-col items-center justify-center bg-white/10 border border-white/20 rounded-2xl aspect-square overflow-hidden">
          {before ? (
            <img
              src={before}
              alt="After (Enhanced)"
              className="object-cover rounded-2xl w-full h-full"
              style={{ filter: autoEnhance ? getEnhanceFilter() : "none" }}
            />
          ) : (
            <div className="flex flex-col items-center text-sm text-white/60">
              <ArrowUpTrayIcon className="w-6 h-6 mb-1" />
              <span>After</span>
              <span className="text-xs mt-1">Auto-enhanced preview</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/80">Apply Camo Auto-Enhance</span>
        <button
          type="button"
          disabled={enhanceLoading || !before}
          onClick={handleToggleEnhance}
          className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-700 rounded-xl disabled:opacity-50"
        >
          {enhanceLoading
            ? "Enhancing..."
            : autoEnhance
            ? "Enhanced"
            : "Enhance"}
        </button>
      </div>

      {enhanceResult?.adjustments && (
        <div className="bg-white/10 p-4 rounded-xl text-sm text-white/80">
          <p className="mb-2 font-semibold text-white">
            Suggested Adjustments:
          </p>
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(enhanceResult.adjustments).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

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
