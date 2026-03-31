"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import CanvasSequence from "./components/CanvasSequence";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];

function GlobalGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

function GlobalVignette() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
  );
}

function ParallaxLayer({ depth = 1, className = "", children }: { depth?: number; className?: string; children: React.ReactNode }) {
  return (
    <div data-parallax={depth} className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}>
      {children}
    </div>
  );
}

function SceneText({
  children,
  position = "center",
  delay = 0,
  depth = 0.5,
}: {
  children: React.ReactNode;
  position?: "left" | "right" | "center";
  delay?: number;
  depth?: number;
}) {
  let layoutClasses = "";
  if (position === "center") layoutClasses = "flex flex-col items-center justify-center text-center w-full";
  if (position === "left") layoutClasses = "flex flex-col justify-center w-full md:w-1/2 pl-6 md:pl-24";
  if (position === "right") layoutClasses = "flex flex-col justify-center items-end text-right w-full md:w-1/2 md:ml-auto pr-6 md:pr-24";

  return (
    <ParallaxLayer depth={depth}>
      <div className={`h-full ${layoutClasses} absolute inset-0 z-20 pointer-events-none`}>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: easeOutCubic, delay }}
          className="pointer-events-auto"
        >
          {children}
        </motion.div>
      </div>
    </ParallaxLayer>
  );
}

function TextOverlay({ position = "center" }: { position?: "left" | "right" | "center" | "bottom" }) {
  let bgClass = "bg-gradient-to-t from-black/80 via-black/20 to-transparent";
  if (position === "left") bgClass = "bg-gradient-to-r from-black/90 via-black/40 to-transparent";
  if (position === "right") bgClass = "bg-gradient-to-l from-black/90 via-black/40 to-transparent";

  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${bgClass}`} />
  );
}

// Custom wrapper for Scene 07 to handle parallax text shift
function FinalScene() {
  const progress = useMotionValue(0);

  // As progress goes from 0.5 to 1.0 (second half of the scroll), we push the text down and fade it
  const yOffset = useTransform(progress, [0, 0.4, 0.9], [0, 0, 800]);
  const opacity = useTransform(progress, [0, 0.4, 0.8], [1, 1, 0]);

  return (
    <CanvasSequence id="scene_07" folder="harvest_sucess" frameCount={240} onProgress={(p) => progress.set(p)} ariaLabel="Final Call to Action">
      <TextOverlay position="center" />
      <motion.div
        style={{ y: yOffset, opacity }}
        className="h-full flex flex-col items-center justify-center text-center w-full absolute inset-0 z-20 pointer-events-none"
      >
        {/* We use an inner motion div for the initial entrance, while the outer wrapper shifts it down on scroll out. */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: easeOutCubic }}
          className="pointer-events-auto flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-[72px] font-bold tracking-tight mb-12 drop-shadow-2xl text-headline">
            Let’s build something <span className="text-primary glow-text">impactful</span>
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white rounded-full text-xl font-bold tracking-widest uppercase transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.8)]"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>
    </CanvasSequence>
  );
}

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <main className="bg-background min-h-screen text-white overflow-hidden relative">
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      <GlobalGrain />
      <GlobalVignette />

      <div className={`relative z-[100] transition-opacity duration-1000 ${preloaderDone ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
      </div>

      <CanvasSequence id="scene_01" folder="from_dark_to_sun_rise" priority={true} frameCount={240} ariaLabel="Introduction to Ellol Digital">
        <TextOverlay position="center" />

        {/* Background layer (0.2x) */}
        <ParallaxLayer depth={0.2} className="opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        </ParallaxLayer>

        {/* Floating particles (1.4x) */}
        <ParallaxLayer depth={1.4} className="opacity-60 flex justify-between items-center px-32">
          <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#FDBA74]" />
          <div className="w-4 h-4 rounded-full bg-primary/50 shadow-[0_0_15px_#F97316] mb-96" />
        </ParallaxLayer>

        <SceneText position="center" delay={0.2} depth={0.8}>
          <h1 className="text-4xl md:text-[72px] font-bold tracking-tight mb-6 drop-shadow-2xl text-headline leading-tight">
            ከዛሬ ያለውን ተጠቅመን ነገን እንገነባለን
          </h1>
          <p className="text-lg md:text-[22px] max-w-2xl mx-auto text-foreground font-light tracking-wide">
            Strategic marketing and creative advertising for modern businesses
          </p>
        </SceneText>
      </CanvasSequence>

      <CanvasSequence id="scene_02" folder="farmer" frameCount={240} ariaLabel="Farming Ideology">
        <TextOverlay position="left" />
        <SceneText position="left">
          <h2 className="text-3xl md:text-[54px] font-bold tracking-tight leading-tight mb-6 drop-shadow-2xl max-w-2xl text-headline">
            Like a farmer who builds the future with what he has,
          </h2>
          <p className="text-xl md:text-[26px] text-primary font-medium tracking-widest uppercase">
            we grow ideas into strong brands.
          </p>
        </SceneText>
      </CanvasSequence>

      <CanvasSequence id="scene_03" folder="seed_transformation" frameCount={240} ariaLabel="Growth Transformation">
        <TextOverlay position="right" />
        <SceneText position="right">
          <h2 className="text-2xl md:text-[44px] font-bold leading-tight max-w-2xl drop-shadow-2xl text-headline">
            Creativity turns small ideas into <span className="text-secondary glow-text block mt-2 text-5xl">powerful growth systems</span>
          </h2>
        </SceneText>
      </CanvasSequence>

      <CanvasSequence id="scene_04" folder="pillars" frameCount={240} ariaLabel="Strategy, Creativity, Impact">
        <TextOverlay position="center" />

        {/* Background layer (0.2x) */}
        <ParallaxLayer depth={0.2} className="opacity-40">
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[120px]" />
        </ParallaxLayer>

        <SceneText position="center">
          <h2 className="text-4xl md:text-[64px] font-black tracking-[0.2em] mb-8 drop-shadow-2xl uppercase text-headline flex gap-4 md:gap-8 flex-wrap justify-center">
            <span>Strategy.</span>
            <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">Creativity.</span>
            <span>Impact.</span>
          </h2>
          <p className="text-lg md:text-[22px] text-foreground font-light tracking-widest max-w-lg mx-auto">
            We combine insight and execution to deliver results.
          </p>
        </SceneText>
      </CanvasSequence>

      <CanvasSequence id="scene_05" folder="to_city" frameCount={240} ariaLabel="Expansion to City">
        <TextOverlay position="left" />
        <SceneText position="left">
          <h2 className="text-4xl md:text-[54px] font-bold leading-tight max-w-xl drop-shadow-2xl text-headline">
            From local roots to <span className="text-primary">modern digital presence</span>.
          </h2>
        </SceneText>
      </CanvasSequence>

      <CanvasSequence id="scene_06" folder="drone" frameCount={150} ariaLabel="Drone Camera Technology">
        <TextOverlay position="right" />
        <SceneText position="right">
          <h2 className="text-3xl md:text-[48px] font-bold mb-10 tracking-tight text-headline drop-shadow-2xl">
            Building the future of advertising
          </h2>
          <div className="flex flex-col gap-6 text-xl md:text-[22px] text-foreground font-light text-right">
            <span className="border-r-4 border-primary pr-6 group-hover:pr-8 transition-all">Drone campaigns</span>
            <span className="border-r-4 border-secondary pr-6">Digital display systems</span>
            <span className="border-r-4 border-primary/50 pr-6">Smart visibility platforms</span>
          </div>
        </SceneText>
      </CanvasSequence>

      {/* FINAL SCENE (Parallax scroll-out component) */}
      <FinalScene />

    </main>
  );
}
