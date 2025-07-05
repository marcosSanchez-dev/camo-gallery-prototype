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
      className="bg-white p-6 shadow rounded space-y-4"
    >
      <h2 className="text-xl font-semibold">Upload Your Before / After</h2>

      <div>
        <label className="block text-sm font-medium mb-1">
          Social media handle
        </label>
        <input
          type="text"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
          placeholder="@yourhandle"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Before Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, "before")}
          />
          {before && (
            <img src={before} alt="Before" className="mt-2 rounded shadow" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">After Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, "after")}
          />
          {after && (
            <img src={after} alt="After" className="mt-2 rounded shadow" />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
}
