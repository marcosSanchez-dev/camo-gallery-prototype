// components/SceneWrapper.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function SceneWrapper({ children, isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={Date.now()}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full"
          style={{
            position: isActive ? "relative" : "absolute",
            zIndex: isActive ? 10 : 0,
            pointerEvents: isActive ? "auto" : "none",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
