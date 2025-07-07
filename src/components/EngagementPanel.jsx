// src/components/EngagementPanel.jsx
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

export default function EngagementPanel() {
  return (
    <section className="relative rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl p-6 text-center">
      <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
        Engagement
      </h2>
      <p className="uppercase text-sm text-white/50 tracking-widest mb-4">
        Camo Community Gallery
      </p>

      <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg">
        <div className="flex">
          <img src="/before.jpg" alt="Before" className="w-1/2 object-cover" />
          <img src="/after.jpg" alt="After" className="w-1/2 object-cover" />
        </div>

        <div className="absolute top-4 left-4 bg-white/10 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-md">
          <span className="text-blue-400">💎</span> Lighting +92%
        </div>

        <div className="absolute bottom-2 w-full text-white text-sm">
          <p className="bg-black/30 w-max mx-auto px-3 py-1 rounded-full">
            Drag to compare
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2">
          <FaInstagram />
        </button>
        <button className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2">
          <FaTiktok />
        </button>
        <button className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2">
          <ArrowDownTrayIcon className="w-4 h-4" />
          Download
        </button>
      </div>

      <div className="mt-4 text-sm text-white/60 hover:text-white cursor-pointer transition">
        <span className="inline-block rotate-90">↻</span> Try another comparison
      </div>
    </section>
  );
}
