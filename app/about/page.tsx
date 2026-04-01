"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { 
  Eye, 
  Target, 
  ShieldCheck, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";

const aboutPillars = [
  {
    id: "01",
    title: "Our Vision",
    accent: "#F97316", // Primary Orange
    icon: <Eye className="w-10 h-10" />,
    shortDesc: "Transforming how businesses grow by combining local insight with global standards.",
    details: [
      "Becoming a leading force in business transformation",
      "Setting global creative standards in Ethiopia",
      "Empowering organizations through strategic vision",
      "Bridging the gap between local culture and global reach"
    ]
  },
  {
    id: "02",
    title: "Our Mission",
    accent: "#FB923C", // Lighter Orange
    icon: <Target className="w-10 h-10" />,
    shortDesc: "Delivering strategic marketing and creative solutions that drive real results.",
    details: [
      "Strengthen brand presence and recognition",
      "Drive measurable business growth",
      "Create lasting social and economic impact",
      "Deliver insight-driven creative execution"
    ]
  },
  {
    id: "03",
    title: "Our Commitment",
    accent: "#ffffff", // Pure White
    icon: <ShieldCheck className="w-10 h-10" />,
    shortDesc: "Adding value where it does not yet exist and building what was never there before.",
    details: [
      "Defining new standards in the creative sector",
      "Bringing innovation to the marketing industry",
      "Starting from scratch to build something meaningful",
      "Ensuring every solution adds tangible value"
    ]
  }
];

function AboutCard({ pillar, index }: { pillar: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-[500px] w-full overflow-hidden flex cursor-pointer border-b md:border-b-0 md:border-r border-white/10 last:border-0"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${pillar.accent}, transparent 70%)` }}
      />

      {/* Main Panel (Base State) */}
      <motion.div 
        animate={{ x: isHovered ? "-10%" : "0%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full flex flex-col p-10 md:p-14 z-10"
      >
        <span className="text-primary/50 font-mono text-sm mb-6 tracking-widest">// PILLAR: {pillar.id}</span>
        <div className="mb-8 p-3 bg-white/5 border border-white/10 w-fit rounded-none clip-path-car transform group-hover:scale-110 transition-transform duration-500">
           {pillar.icon}
        </div>
        <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight max-w-[200px] uppercase tracking-tighter">
          {pillar.title.split(' ').map((word: string, i: number) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h3>
        <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-sm mt-auto">
          {pillar.shortDesc}
        </p>
        
        <div className="mt-8 flex items-center gap-2 group-hover:text-primary transition-colors">
           <span className="text-xs uppercase tracking-[0.3em] font-medium italic">Read Objective</span>
           <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>

      {/* Detail Panel (Hover State - "Opposite Side") */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="absolute inset-0 z-20"
          >
            {/* Split Diagonal Background - Car UI Style */}
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: pillar.accent }}
            />
            
            {/* The "Black Text" Content */}
            <div className="relative h-full w-full p-10 flex flex-col text-black">
              <div className="flex justify-between items-start mb-8 text-black/40 font-mono text-xs tracking-tighter">
                <span>// NARRATIVE_EXPANSION</span>
                <ArrowUpRight size={20} className="text-black" />
              </div>
              
              <div className="overflow-y-auto pr-4 custom-scrollbar-black h-full flex flex-col">
                <h4 className="text-2xl font-black uppercase tracking-tight mb-8 border-b-2 border-black/10 pb-4">
                  {pillar.title}
                </h4>
                
                <ul className="space-y-6">
                  {pillar.details.map((item: string, i: number) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="w-2 h-2 bg-black mt-2 shrink-0 transform rotate-45 group-hover/item:scale-150 transition-transform" />
                      <span className="text-xl font-bold leading-tight tracking-tight">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen text-white overflow-x-hidden relative">
      <Navbar />
      
      {/* Dynamic Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="pt-40 pb-20 container mx-auto px-6 relative z-10">
        
        {/* HERO - CENTERED */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-6">// OUR_NARRATIVE</span>
            <h1 className="text-[12vw] leading-[0.7] font-black uppercase tracking-tighter mb-12 flex flex-col items-center">
              <span>Who</span>
              <span className="text-primary italic outline-text">We Are</span>
            </h1>
            <div className="h-0.5 w-64 bg-gradient-to-r from-transparent via-primary to-transparent mb-12" />
            <p className="text-xl md:text-3xl text-foreground font-light max-w-3xl leading-relaxed tracking-wide italic">
              "We are a collective of digital creatives and strategists based in Ethiopia, 
              building the future of advertising with 
              <span className="text-white font-bold not-italic"> global standards and local roots."</span>
            </p>
          </motion.div>
        </div>

        {/* Narrative Pillars Row (3 Wide Cards) */}
        <div className="flex flex-col lg:flex-row border-t border-b border-white/10 min-h-[500px]">
          {aboutPillars.map((pillar, idx) => (
            <AboutCard key={pillar.id} pillar={pillar} index={idx} />
          ))}
        </div>

        {/* Footer Call to Action */}
        <div className="mt-32 text-center pb-20">
           <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex flex-col gap-2">
              <span>Impact starts</span>
              <span className="text-primary glow-text italic">with vision</span>
           </h2>
           <a 
            href="/contact"
            className="group relative inline-flex items-center justify-center px-16 py-8 bg-white text-black font-black text-2xl uppercase tracking-tighter overflow-hidden"
           >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">Connect With Us</span>
           </a>
        </div>

      </div>
      
      {/* Decorative Car UI HUD Elements */}
      <div className="fixed bottom-10 right-10 hidden lg:block opacity-20 pointer-events-none text-right">
         <div className="font-mono text-[10px] space-y-1">
            <div>SYSTEM_VERSION: 1.0.42_STABLE</div>
            <div>CORE: DIGITAL_CREATIVE_STRATEGY</div>
            <div>LOCATION: ADDIS_ABABA, ETHIOPIA</div>
         </div>
      </div>
    </main>
  );
}
