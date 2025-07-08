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

export default function EngagementPanel({ entry }) {
  const canvasRef = useRef(null);
  const [sliderPercentage, setSliderPercentage] = useState(0.5);

  const getAfterImage = () => {
    if (!entry) return { url: null, filter: null };

    if (entry.autoEnhance && entry.enhanceResult?.adjustments) {
      return {
        url: entry.before,
        filter: entry.enhanceResult.adjustments,
      };
    } else {
      return {
        url: entry.after,
        filter: null,
      };
    }
  };

  const buildCSSFilter = (adjustments) => {
    const brightness = 1 + parseInt(adjustments?.brightness || "0", 10) / 100;
    const contrast = 1 + parseInt(adjustments?.contrast || "0", 10) / 100;
    const saturate =
      1 + parseInt(adjustments?.colorCorrection || "0", 10) / 100;

    return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
  };

  const handleDownload = () => {
    const { url: before } = { url: entry.before };
    const { url: after, filter } = getAfterImage();

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
        ctx.drawImage(beforeImg, 0, 0, splitX, height, 0, 0, splitX, height);

        // Right side from after (with optional filter)
        if (filter) {
          ctx.filter = buildCSSFilter(filter);
        } else {
          ctx.filter = "none";
        }

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
        link.download = "comparison.png";
        link.href = canvas.toDataURL();
        link.click();
      };
    };
  };

  const afterData = getAfterImage();

  return (
    <section className="relative rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl p-6 space-y-4 text-white text-center">
      <h2 className="text-2xl font-bold tracking-wide mb-4">
        CAMO COMMUNITY GALLERY
      </h2>

      {entry?.before && afterData?.url ? (
        <>
          <CompareSlider
            before={entry.before}
            after={afterData.url}
            filter={afterData.filter}
            sliderPercentage={sliderPercentage}
            setSliderPercentage={setSliderPercentage}
            key={entry.before + afterData.url}
          />

          <div className="flex justify-center flex-wrap gap-4 mb-6">
            {/* 📥 Download */}
            <button
              onClick={handleDownload}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-105"
              title="Download Comparison"
            >
              <ArrowDownTrayIcon className="h-6 w-6" />
            </button>

            {/* 📤 Native share (mobile) */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: "Camo Gallery",
                      text: "Check out this before/after transformation!",
                      url: window.location.href,
                    })
                    .catch((err) => console.error("Share failed:", err));
                } else {
                  alert("Sharing not supported on this device.");
                }
              }}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-105"
              title="Share this"
            >
              <FaShareAlt className="h-6 w-6" />
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
              url={window.location.href}
              title="Check this out from the CAMO Gallery!"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            {/* 📘 Facebook */}
            <FacebookShareButton
              url={window.location.href}
              quote="Awesome before/after from CAMO Gallery!"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            {/* 📱 WhatsApp */}
            <WhatsappShareButton
              url={window.location.href}
              title="Check this out from CAMO!"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            {/* ✈️ Telegram */}
            <TelegramShareButton
              url={window.location.href}
              title="Before/after from CAMO Gallery!"
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          <p className="text-sm text-white/60">💎 Lighting +92%</p>
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
