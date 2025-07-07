import { useRef } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import CompareSlider from "./CompareSlider";

export default function EngagementPanel({ before, after }) {
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const beforeImg = new Image();
    const afterImg = new Image();

    beforeImg.crossOrigin = "anonymous";
    afterImg.crossOrigin = "anonymous";

    beforeImg.src = before;
    afterImg.src = after;

    beforeImg.onload = () => {
      afterImg.onload = () => {
        const width = beforeImg.width + afterImg.width;
        const height = Math.max(beforeImg.height, afterImg.height);

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(beforeImg, 0, 0);
        ctx.drawImage(afterImg, beforeImg.width, 0);

        const link = document.createElement("a");
        link.download = "comparison.png";
        link.href = canvas.toDataURL();
        link.click();
      };
    };
  };

  return (
    <section className="relative rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl p-6 space-y-4 text-white text-center">
      <h2 className="text-2xl font-bold tracking-wide mb-4">
        CAMO COMMUNITY GALLERY
      </h2>

      <CompareSlider before="public\before.jpg" after="public\after.jpg" />

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleDownload}
          className="bg-white/10 hover:bg-white/20 p-3 rounded-full"
          title="Download Comparison"
        >
          <ArrowDownTrayIcon className="h-6 w-6" />
        </button>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 p-3 rounded-full"
          title="Share on Instagram"
        >
          <FaInstagram className="h-6 w-6" />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 p-3 rounded-full"
          title="Share on TikTok"
        >
          <FaTiktok className="h-6 w-6" />
        </a>
      </div>

      <p className="text-sm text-white/60">💎 Lighting +92%</p>
      <p className="text-sm text-white/60">↻ Drag to compare</p>

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
}
