"use client";

import { motion } from "framer-motion";
import CanvasSequence from "./components/CanvasSequence";
import Navbar from "./components/Navbar";

// Easing for entrances (easeOutCubic equivalent)
const easeOutCubic = [0.33, 1, 0.68, 1];

// A wrapper for text blocks to give them a cinematic entrance
function SceneText({
  children,
  position = "center",
  delay = 0,
}: {
  children: React.ReactNode;
  position?: "left" | "right" | "center";
  delay?: number;
}) {
  let layoutClasses = "";
  if (position === "center") layoutClasses = "flex flex-col items-center justify-center text-center w-full";
  if (position === "left") layoutClasses = "flex flex-col justify-center w-full md:w-1/2 pl-6 md:pl-24";
  if (position === "right") layoutClasses = "flex flex-col justify-center items-end text-right w-full md:w-1/2 md:ml-auto pr-6 md:pr-24";

  return (
    <div className={`h-full ${layoutClasses} absolute inset-0 z-20 pointer-events-none`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: easeOutCubic, delay }}
        className="pointer-events-auto" // Optional if buttons are inside
      >
        {children}
      </motion.div>
    </div>
  );
}

// Background dark gradient overlay to ensure text readability over bright scenes
function TextOverlay({ position = "center" }: { position?: "left" | "right" | "center" | "bottom" }) {
  let bgClass = "bg-gradient-to-t from-black/80 via-black/30 to-transparent";
  if (position === "left") bgClass = "bg-gradient-to-r from-black/80 via-black/40 to-transparent";
  if (position === "right") bgClass = "bg-gradient-to-l from-black/80 via-black/40 to-transparent";
  
  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${bgClass}`} />
  );
}

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-white overflow-hidden">
      <Navbar />

      {/* SCENE 01: ORIGIN */}
      <CanvasSequence id="scene_01" folder="from_dark_to_sun_rise" frameCount={240}>
        <TextOverlay position="center" />
        <SceneText position="center" delay={0.2}>
          <h1 className="text-4xl md:text-[72px] font-bold tracking-tight mb-6 drop-shadow-xl text-headline leading-tight">
            ከዛሬ ያለውን ተጠቅመን ነገን እንገነባለን
          </h1>
          <p className="text-lg md:text-[22px] max-w-2xl mx-auto text-foreground font-light">
            Strategic marketing and creative advertising for modern businesses
          </p>
        </SceneText>
      </CanvasSequence>

      {/* SCENE 02: THE FARMER */}
      <CanvasSequence id="scene_02" folder="farmer" frameCount={240}>
        <TextOverlay position="left" />
        <SceneText position="left">
          <h2 className="text-3xl md:text-[54px] font-bold tracking-tight leading-tight mb-6 drop-shadow-lg max-w-2xl text-headline">
            Like a farmer who builds the future with what he has,
          </h2>
          <p className="text-xl md:text-[24px] text-primary font-medium tracking-wide">
            we grow ideas into strong brands.
          </p>
        </SceneText>
      </CanvasSequence>

      {/* SCENE 03: SEED TRANSFORMATION */}
      <CanvasSequence id="scene_03" folder="seed_transformation" frameCount={240}>
        <TextOverlay position="right" />
        <SceneText position="right">
          <p className="text-2xl md:text-[44px] font-bold leading-tight max-w-2xl drop-shadow-lg text-headline">
            Creativity turns small ideas into <span className="text-secondary glow-text">powerful growth systems</span>
          </p>
        </SceneText>
      </CanvasSequence>

      {/* SCENE 04: PILLARS */}
      <CanvasSequence id="scene_04" folder="pillars" frameCount={240}>
        <TextOverlay position="center" />
        <SceneText position="center">
          <h2 className="text-4xl md:text-[64px] font-bold tracking-widest mb-6 drop-shadow-lg uppercase text-headline flex gap-4 md:gap-8 flex-wrap justify-center">
            <span>Strategy.</span>
            <span className="text-secondary">Creativity.</span>
            <span>Impact.</span>
          </h2>
          <p className="text-lg md:text-[22px] text-foreground font-light tracking-wide max-w-lg mx-auto">
            We combine insight and execution to deliver results.
          </p>
        </SceneText>
      </CanvasSequence>

      {/* SCENE 05: TO CITY */}
      <CanvasSequence id="scene_05" folder="to_city" frameCount={240}>
        <TextOverlay position="left" />
        <SceneText position="left">
          <h2 className="text-4xl md:text-[54px] font-bold leading-tight max-w-xl drop-shadow-xl text-headline">
            From local roots to <span className="text-primary">modern digital presence</span>.
          </h2>
        </SceneText>
      </CanvasSequence>

      {/* SCENE 06: DRONE */}
      <CanvasSequence id="scene_06" folder="drone" frameCount={150}>
        <TextOverlay position="right" />
        <SceneText position="right">
          <h2 className="text-3xl md:text-[48px] font-bold mb-8 tracking-tight text-headline drop-shadow-lg">
            Building the future of advertising
          </h2>
          <div className="flex flex-col gap-4 text-xl md:text-[22px] text-foreground font-light text-right">
            <span className="border-r-2 border-primary pr-4">Drone campaigns</span>
            <span className="border-r-2 border-secondary pr-4">Digital display systems</span>
            <span className="border-r-2 border-primary/50 pr-4">Smart visibility platforms</span>
          </div>
        </SceneText>
      </CanvasSequence>

      {/* SCENE 07: HARVEST SUCCESS */}
      <CanvasSequence id="scene_07" folder="harvest_sucess" frameCount={240}>
        <TextOverlay position="center" />
        <SceneText position="center">
          <h2 className="text-5xl md:text-[72px] font-bold tracking-tight mb-12 drop-shadow-2xl text-headline">
            Let’s build something <span className="text-primary">impactful</span>
          </h2>
          <a
            href="/contact"
            className="inline-flex relative z-30 pointer-events-auto items-center justify-center px-10 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white rounded-full text-lg font-bold tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]"
          >
            Contact Us
          </a>
        </SceneText>
      </CanvasSequence>

    </main>
  );
}
