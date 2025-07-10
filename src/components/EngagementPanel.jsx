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
    <section className="relative rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl p-6 space-y-4 text-white text-center">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold tracking-wide mb-4">
        CAMO COMMUNITY GALLERY
      </h2>

      {entry?.before && (entry?.after || entry?.enhancedImage) ? (
        <>
          <CompareSlider
            before={entry.before}
            after={entry.enhancedImage || entry.after}
            filter={entry.enhancedImage ? "none" : entry.filter}
            sliderPercentage={sliderPercentage}
            setSliderPercentage={setSliderPercentage}
            key={entry.id + (entry.enhancedImage ? "-enhanced" : "")}
          />

          <div className="flex flex-col items-center mb-6">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {/* Descargar comparación */}
              <button
                onClick={handleDownloadComparison}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Download Comparison</span>
              </button>

              {/* Descargar solo imagen mejorada */}
              <button
                onClick={handleDownloadEnhanced}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Download Enhanced</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {/* 📤 Native share */}
              <button
                onClick={handleShare}
                disabled={isSharing}
                className={`bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-105 ${
                  isSharing ? "opacity-70 cursor-not-allowed" : ""
                }`}
                title="Share this"
              >
                {isSharing ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-1"
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
                  </span>
                ) : (
                  <FaShareAlt className="h-6 w-6" />
                )}
              </button>

              {/* 🟪 Instagram */}
              <a
                href="https://www.instagram.com/camo.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-105"
                title="Visit us on Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>

              {/* 🖤 TikTok */}
              <a
                href="https://www.tiktok.com/@camo.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-105"
                title="Visit us on TikTok"
              >
                <FaTiktok className="h-6 w-6" />
              </a>

              {/* 🐦 Twitter */}
              <TwitterShareButton
                url={shareUrl}
                title={title}
                via="camo_studio"
                hashtags={["photoediting", "camoapp"]}
              >
                <div className="bg-white/10 hover:bg-white/20 p-1 rounded-full transition-all hover:scale-105">
                  <TwitterIcon size={32} round />
                </div>
              </TwitterShareButton>

              {/* 📘 Facebook */}
              <FacebookShareButton
                url={shareUrl}
                quote="I enhanced this photo using CAMO - check it out!"
                hashtag="#camoapp"
              >
                <div className="bg-white/10 hover:bg-white/20 p-1 rounded-full transition-all hover:scale-105">
                  <FacebookIcon size={32} round />
                </div>
              </FacebookShareButton>

              {/* 📱 WhatsApp */}
              <WhatsappShareButton
                url={shareUrl}
                title="Check out my enhanced photo with CAMO!"
              >
                <div className="bg-white/10 hover:bg-white/20 p-1 rounded-full transition-all hover:scale-105">
                  <WhatsappIcon size={32} round />
                </div>
              </WhatsappShareButton>

              {/* ✈️ Telegram */}
              <TelegramShareButton url={shareUrl} title={title}>
                <div className="bg-white/10 hover:bg-white/20 p-1 rounded-full transition-all hover:scale-105">
                  <TelegramIcon size={32} round />
                </div>
              </TelegramShareButton>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-white/60">
            <span>❤️ {entry.likes ?? 0} likes</span>
            <span>👁️ {entry.views ?? 0} views</span>
          </div>
          <p className="text-sm text-white/60">↻ Drag to compare</p>
        </>
      ) : (
        <p className="text-white/60">
          Select a submission to preview the comparison.
        </p>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
}
