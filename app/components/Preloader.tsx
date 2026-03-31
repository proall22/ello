"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll immediately on mount
    document.body.style.overflow = "hidden";

    const timers = [
      setTimeout(() => setPhase(1), 500),  // Line 1
      setTimeout(() => setPhase(2), 1500), // Line 2
      setTimeout(() => setPhase(3), 2500), // Line 3
      setTimeout(() => setPhase(4), 3500), // Line 4
      setTimeout(() => setPhase(5), 4500), // Logo reveal
      setTimeout(() => setPhase(6), 5100), // Glow out
      setTimeout(() => {
        setIsVisible(false);
      }, 5600),
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 6100)
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
          transition={{ duration: 0.7, ease: "easeInOut" }}
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

          <div className="relative z-10 w-full gap-8 max-w-4xl px-6 flex flex-col items-center h-[50vh] justify-center">

            {/* The Dot / Logo Container */}
            <div className="h-24 flex items-center justify-center relative w-full">
              <AnimatePresence mode="wait">
                {phase < 5 ? (
                  <motion.div
                    key="dot"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: phase > 0 ? 1.5 : 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                  />
                ) : (
                  <motion.img
                    key="logo"
                    src="/assets/logo/logoEllolCreative.png"
                    alt="Ellol Digital Creatives"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Typography Sequence */}
            <div className="flex flex-col items-center justify-center gap-6 text-center absolute top-[60%]">
              <AnimatePresence>
                {phase >= 1 && phase < 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                    exit={{ opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-white text-lg md:text-2xl font-light tracking-widest uppercase"
                  >
                    Built from here
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {phase >= 2 && phase < 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                    exit={{ opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-white text-lg md:text-2xl font-light tracking-widest uppercase"
                  >
                    Built with strategy
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {phase >= 3 && phase < 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                    exit={{ opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-white text-lg md:text-2xl font-light tracking-widest uppercase"
                  >
                    Built with creativity
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {phase >= 4 && phase < 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                    exit={{ opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="relative text-white text-lg md:text-2xl font-bold tracking-widest uppercase text-secondary drop-shadow-[0_0_15px_rgba(253,186,116,0.3)]"
                  >
                    Built for growth
                    <motion.div
                      className="absolute -bottom-3 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                      style={{ originX: 0 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Exit Transition Glow */}
          <AnimatePresence>
            {phase === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-primary/5 to-transparent mix-blend-screen pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
