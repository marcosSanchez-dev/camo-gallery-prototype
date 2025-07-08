// components/SceneWrapper.jsx
import { motion } from "framer-motion";

export default function SceneWrapper({ children, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ position: isActive ? "relative" : "absolute", width: "100%" }}
      className={isActive ? "z-10" : "pointer-events-none z-0"}
    >
      {children}
    </motion.div>
  );
}
