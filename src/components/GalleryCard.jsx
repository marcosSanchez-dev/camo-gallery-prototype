import { useState } from "react";
import { motion } from "framer-motion";

export default function GalleryCard({ data, onClick }) {
  const { before, after, username, likes, views, filter } = data;
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);

  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl shadow-md border border-white/10 backdrop-blur-sm bg-white/5 hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={() => onClick?.(data)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Placeholder para imagen before */}
        {!beforeLoaded && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-xl"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Imagen before */}
        <motion.img
          src={before}
          alt="Before"
          className="w-full aspect-square object-cover rounded-t-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: beforeLoaded ? 1 : 0 }}
          onLoad={() => setBeforeLoaded(true)}
          transition={{ duration: 0.5 }}
        />

        {/* Placeholder para imagen after */}
        {!afterLoaded && (
          <motion.div
            className="absolute inset-0 -mt-1 bg-gradient-to-br from-gray-700 to-gray-800 rounded-b-xl"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        )}

        {/* Imagen after con filtro */}
        <motion.img
          src={after}
          alt="After"
          className="w-full aspect-square object-cover rounded-b-xl -mt-1"
          style={{ filter }}
          initial={{ opacity: 0 }}
          animate={{ opacity: afterLoaded ? 1 : 0 }}
          onLoad={() => setAfterLoaded(true)}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Overlay en hover */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
        <div className="text-sm text-white/70 font-medium">
          {username || "@anonymous"}
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span>❤️ {likes ?? 0}</span>
          <span>👁️ {views ?? 0}</span>
        </div>
      </div>
    </motion.div>
  );
}
