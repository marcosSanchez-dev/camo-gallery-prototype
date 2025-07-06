import { useState } from "react";

export default function UploadForm({ onSubmit }) {
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [social, setSocial] = useState("");

  const handleImage = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    type === "before" ? setBefore(url) : setAfter(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!before || !after || !social) {
      alert("Please complete all fields.");
      return;
    }

    const newEntry = { before, after, social };
    onSubmit(newEntry);

    // limpia el formulario
    setBefore(null);
    setAfter(null);
    setSocial("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 text-white"
    >
      <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
        Upload Your Before / After
      </h2>

      <div>
        <label className="block text-sm font-medium mb-2 text-white/80">
          Social media handle
        </label>
        <input
          type="text"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
          placeholder="@yourhandle"
          className="w-full bg-white/5 text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Before Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, "before")}
            className="file:bg-cyan-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:mr-4 bg-white/10 border border-white/20 rounded-lg text-sm text-white/70"
          />
          {before && (
            <img
              src={before}
              alt="Before"
              className="rounded-xl shadow-lg border border-white/10"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">After Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, "after")}
            className="file:bg-cyan-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:mr-4 bg-white/10 border border-white/20 rounded-lg text-sm text-white/70"
          />

          {after && (
            <img
              src={after}
              alt="After"
              className="rounded-xl shadow-lg border border-white/10"
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/80">Apply Camo Auto-Enhance</span>
        <div className="w-10 h-6 bg-cyan-500 rounded-full relative cursor-pointer">
          <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform transform translate-x-4" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-b from-white/10 to-white/5 hover:from-white/20 text-white font-semibold text-lg py-3 rounded-xl transition-all duration-200 shadow-md"
      >
        Submit
      </button>
    </form>
  );
}
