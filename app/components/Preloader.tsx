"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState(0); // 0: Logo reveal, 1: Glow out

  useEffect(() => {
    // Lock scroll immediately on mount
    document.body.style.overflow = "hidden";

    const timers = [
      setTimeout(() => setPhase(1), 2000), // Start exit sequence after 2s
      setTimeout(() => setIsVisible(false), 2500), // Hide preloader after 2.5s
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 3000) // Complete all after 3s
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
            <svg className="w-full h-full">
              <filter id="preloader-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#preloader-noise)" />
            </svg>
          </div>

          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {/* The Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              className="relative"
            >
              <img
                src="/assets/logo/logoEllolCreative.png"
                alt="Ellol Digital Creatives"
                className="h-20 md:h-28 w-auto object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.4)] mix-blend-lighten"
              />
              
              {/* Subtle pulsing glow behind logo */}
              <motion.div 
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full"
              />
            </motion.div>
          </div>

          {/* Exit Transition Glow */}
          <AnimatePresence>
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent mix-blend-screen pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
