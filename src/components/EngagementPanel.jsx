import { useRef, useState } from "react";
import { FaInstagram, FaTiktok, FaShareAlt } from "react-icons/fa";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import CompareSlider from "./CompareSlider";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

export default function EngagementPanel({ entry, onBack }) {
  const canvasRef = useRef(null);
  const [sliderPercentage, setSliderPercentage] = useState(0.5);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownloadComparison = () => {
    if (!entry) return;

    const before = entry.before;
    const after = entry.enhancedImage || entry.after;
    const filter = entry.enhancedImage ? "none" : entry.filter;

    if (!before || !after) return;

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
        const width = beforeImg.width;
        const height = beforeImg.height;

        canvas.width = width;
        canvas.height = height;

        const splitX = Math.floor(width * sliderPercentage);

        // Left side from before
        ctx.filter = "none";
        ctx.drawImage(beforeImg, 0, 0, splitX, height, 0, 0, splitX, height);

        // Right side from after
        ctx.filter = filter || "none";
        ctx.drawImage(
          afterImg,
          splitX,
          0,
          width - splitX,
          height,
          splitX,
          0,
          width - splitX,
          height
        );

        const link = document.createElement("a");
        link.download = "camo-comparison.png";
        link.href = canvas.toDataURL();
        link.click();
      };
    };
  };

  const handleDownloadEnhanced = () => {
    if (!entry) return;

    const after = entry.enhancedImage || entry.after;
    const filter = entry.enhancedImage ? "none" : entry.filter;

    if (!after) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const afterImg = new Image();
    afterImg.crossOrigin = "anonymous";
    afterImg.src = after;

    afterImg.onload = () => {
      const width = afterImg.width;
      const height = afterImg.height;

      canvas.width = width;
      canvas.height = height;

      ctx.filter = filter || "none";
      ctx.drawImage(afterImg, 0, 0, width, height);

      const link = document.createElement("a");
      link.download = "camo-enhanced.png";
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  const handleShare = async () => {
    if (!entry) return;

    setIsSharing(true);

    try {
      // Primero generamos la imagen mejorada
      const after = entry.enhancedImage || entry.after;
      const filter = entry.enhancedImage ? "none" : entry.filter;

      if (!after) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const afterImg = new Image();

      afterImg.onload = () => {
        const width = afterImg.width;
        const height = afterImg.height;

        canvas.width = width;
        canvas.height = height;

        ctx.filter = filter || "none";
        ctx.drawImage(afterImg, 0, 0, width, height);

        // Convertir canvas a blob
        canvas.toBlob((blob) => {
          if (navigator.share && blob) {
            // Compartir usando API nativa
            const file = new File([blob], "camo-enhanced.png", {
              type: "image/png",
            });

            navigator
              .share({
                title: "Check out my enhanced photo!",
                text: "I used CAMO to enhance this photo. What do you think?",
                files: [file],
                url: window.location.href,
              })
              .catch((error) => {
                console.log("Sharing failed", error);
                alert("Sharing failed. Please try again.");
              });
          } else {
            // Fallback para navegadores sin soporte de share
            const link = document.createElement("a");
            link.download = "camo-enhanced.png";
            link.href = canvas.toDataURL();
            link.click();
            alert("Enhanced image downloaded! You can now share it manually.");
          }

          setIsSharing(false);
        }, "image/png");
      };

      afterImg.src = after;
    } catch (error) {
      console.error("Sharing error:", error);
      setIsSharing(false);
      alert("Failed to share. Please try again.");
    }
  };

  // URL para compartir con imagen de vista previa
  const shareUrl = window.location.href;
  const title = "Check out my photo enhancement with CAMO!";
  const imageUrl = entry?.enhancedImage || entry?.after || "";

  return (
    <section className="relative rounded-2xl bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.3)] p-8 space-y-8 text-white text-center overflow-hidden">
      {/* Efecto de borde luminoso */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_15px_rgba(192,132,252,0.4)]" />

      {/* Botón de regreso */}
      <button
        onClick={onBack}
        className="absolute top-0 left-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors group z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Back to Gallery</span>
      </button>

      {/* Título con efecto gradiente */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          CAMO COMMUNITY
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto" />
      </div>

      {entry?.before && (entry?.after || entry?.enhancedImage) ? (
        <div className="relative z-10">
          {/* Slider de comparación */}
          <div className="relative rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 mb-6">
            <CompareSlider
              before={entry.before}
              after={entry.enhancedImage || entry.after}
              filter={entry.enhancedImage ? "none" : entry.filter}
              sliderPercentage={sliderPercentage}
              setSliderPercentage={setSliderPercentage}
              key={entry.id + (entry.enhancedImage ? "-enhanced" : "")}
            />

            {/* Indicador de arrastre */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white/80 border border-white/10">
              ↻ Drag to compare
            </div>
          </div>

          {/* Badge de calidad */}
          {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
            <span className="font-semibold">Lighting +92%</span>
          </div> */}

          {/* Botones de acción principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            <button
              onClick={handleDownloadComparison}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 hover:from-cyan-600/30 hover:to-purple-600/30 border border-white/10 px-4 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
            >
              <ArrowDownTrayIcon className="h-5 w-5 text-cyan-300" />
              <span className="font-medium">Download Comparison</span>
            </button>

            <button
              onClick={handleDownloadEnhanced}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 hover:from-cyan-600/30 hover:to-purple-600/30 border border-white/10 px-4 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
            >
              <ArrowDownTrayIcon className="h-5 w-5 text-purple-300" />
              <span className="font-medium">Download Enhanced</span>
            </button>
          </div>

          {/* Botones de compartir */}
          <div className="mb-8">
            <h3 className="text-white/80 mb-4 font-medium">
              Share your transformation
            </h3>

            <div className="flex flex-wrap justify-center gap-3">
              {/* Botón de compartir nativo */}
              <button
                onClick={handleShare}
                disabled={isSharing}
                className={`bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-3 rounded-xl transition-all hover:scale-105 shadow ${
                  isSharing
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                }`}
                title="Share this"
              >
                {isSharing ? (
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    Sharing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaShareAlt className="h-5 w-5 text-white" />
                    <span className="font-medium">Share</span>
                  </div>
                )}
              </button>

              {/* Botones de redes sociales */}
              <a
                href="https://www.instagram.com/camo.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-3 rounded-xl transition-all hover:scale-105 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] group"
                title="Visit us on Instagram"
              >
                <div className="flex items-center gap-2">
                  <FaInstagram className="h-5 w-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
                  <span className="font-medium">Instagram</span>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@camo.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-3 rounded-xl transition-all hover:scale-105 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] group"
                title="Visit us on TikTok"
              >
                <div className="flex items-center gap-2">
                  <FaTiktok className="h-5 w-5 text-black group-hover:text-gray-800 transition-colors" />
                  <span className="font-medium">TikTok</span>
                </div>
              </a>
            </div>
          </div>

          {/* Botones de compartir directo */}
          <div className="mb-8">
            <h3 className="text-white/80 mb-4 font-medium">
              Or share directly
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <TwitterShareButton
                url={shareUrl}
                title={title}
                via="camo_studio"
                hashtags={["photoediting", "camoapp"]}
              >
                <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-2 rounded-xl transition-all hover:scale-105 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <TwitterIcon
                    size={36}
                    round
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </TwitterShareButton>

              <FacebookShareButton
                url={shareUrl}
                quote="I enhanced this photo using CAMO - check it out!"
                hashtag="#camoapp"
              >
                <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-2 rounded-xl transition-all hover:scale-105 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <FacebookIcon
                    size={36}
                    round
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </FacebookShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title="Check out my enhanced photo with CAMO!"
              >
                <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-2 rounded-xl transition-all hover:scale-105 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <WhatsappIcon
                    size={36}
                    round
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </WhatsappShareButton>

              <TelegramShareButton url={shareUrl} title={title}>
                <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-white/10 p-2 rounded-xl transition-all hover:scale-105 shadow hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <TelegramIcon
                    size={36}
                    round
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </TelegramShareButton>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="flex justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rose-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{entry.likes ?? 0} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-cyan-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{entry.views ?? 0} views</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white/60 py-12">
          Select a submission to preview the comparison.
        </p>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
}
