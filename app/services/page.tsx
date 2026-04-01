"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { 
  Globe, 
  TrendingUp, 
  Target, 
  Handshake, 
  Zap, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Digital Marketing & Social Media Management",
    accent: "#F97316", // Primary Orange
    icon: <Globe className="w-10 h-10" />,
    shortDesc: "We build and manage powerful digital presence for businesses and organizations.",
    details: [
      "Social media account management",
      "Content creation and planning",
      "Brand positioning and strategy",
      "Audience growth and engagement",
      "Performance tracking and optimization"
    ],
    clients: ["Businesses", "Organizations", "Corporates"]
  },
  {
    id: "02",
    title: "Export-Focused Marketing Solutions",
    accent: "#FB923C", // Lighter Orange
    icon: <TrendingUp className="w-10 h-10" />,
    shortDesc: "Helping Ethiopian businesses compete globally with strategic branding.",
    details: [
      "Digital presence development for export businesses",
      "International audience targeting",
      "Branding for global competitiveness",
      "Market-oriented content strategy"
    ]
  },
  {
    id: "03",
    title: "Advertising Campaign Development",
    accent: "#ffffff", // Pure White
    icon: <Target className="w-10 h-10" />,
    shortDesc: "Designing campaigns that communicate, connect, and convert.",
    details: [
      "Creative campaign design and execution",
      "Brand storytelling and messaging",
      "Multi-platform advertising strategies",
      "Promotional and awareness campaigns"
    ]
  },
  {
    id: "04",
    title: "Corporate & Business Collaborations",
    accent: "#F97316",
    icon: <Handshake className="w-10 h-10" />,
    shortDesc: "Partnering with organizations to expand reach and impact through corporate initiatives.",
    details: [
      "Strategic partnerships with companies and brands",
      "Marketing support for corporate initiatives",
      "Joint campaign development"
    ]
  },
  {
    id: "05",
    title: "Event & Promotional Campaign Support",
    accent: "#FB923C",
    icon: <Zap className="w-10 h-10" />,
    shortDesc: "Bringing visibility and energy to events and large-scale activations.",
    details: [
      "Marketing for events and activations",
      "Promotional content creation",
      "Collaboration with event organizers"
    ]
  }
];

function ServiceCard({ service, index }: { service: any, index: number }) {
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
        style={{ background: `radial-gradient(circle at center, ${service.accent}, transparent 70%)` }}
      />

      {/* Main Panel (Base State) */}
      <motion.div 
        animate={{ x: isHovered ? "-10%" : "0%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full flex flex-col p-10 md:p-14 z-10"
      >
        <span className="text-primary/50 font-mono text-sm mb-6 tracking-widest">{service.id}</span>
        <div className="mb-8 p-3 bg-white/5 border border-white/10 w-fit rounded-none clip-path-car transform group-hover:scale-110 transition-transform duration-500">
           {service.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-[200px]">
          {service.title.split(' ').map((word: string, i: number) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h3>
        <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-xs mt-auto">
          {service.shortDesc}
        </p>
        
        <div className="mt-8 flex items-center gap-2 group-hover:text-primary transition-colors">
           <span className="text-xs uppercase tracking-[0.3em] font-medium">Explore Details</span>
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
              style={{ backgroundColor: service.accent }}
            />
            
            {/* The "Black Text" Content */}
            <div className="relative h-full w-full p-10 flex flex-col text-black">
              <div className="flex justify-between items-start mb-8 text-black/40 font-mono text-xs tracking-tighter">
                <span>// DETAILS_VIEW</span>
                <ArrowUpRight size={20} className="text-black" />
              </div>
              
              <div className="overflow-y-auto pr-4 custom-scrollbar-black h-full flex flex-col">
                <h4 className="text-2xl font-black uppercase tracking-tight mb-8 border-b-2 border-black/10 pb-4">
                  {service.title}
                </h4>
                
                <ul className="space-y-4">
                  {service.details.map((item: string, i: number) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0 group-hover/item:scale-150 transition-transform" />
                      <span className="text-lg font-medium leading-tight">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {service.clients && (
                  <div className="mt-auto pt-8">
                    <span className="text-[10px] uppercase tracking-widest font-black text-black/50 block mb-2">Service Verticals</span>
                    <div className="flex flex-wrap gap-2">
                      {service.clients.map((client: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-tighter uppercase rounded-none">
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-background min-h-screen text-white overflow-x-hidden relative">
      <Navbar />
      
      {/* Dynamic Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="pt-40 pb-20 container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-2 leading-[0.8] flex flex-col">
              <span>Our</span>
              <span className="text-primary italic outline-text">Capabilities</span>
            </h1>
            <div className="h-2 w-32 bg-primary mt-8 mb-8" />
            <p className="text-xl md:text-2xl text-foreground/70 font-light max-w-2xl leading-relaxed tracking-wide">
              We engineer cinematic brand ecosystems that connect with audiences 
              <span className="text-white font-medium"> from the digital screen to the physical sky.</span>
            </p>
          </motion.div>
        </div>

        {/* Horizontal Card Row (Horizontal Scroll on Mobile, Flex on Desktop) */}
        <div className="flex flex-col md:flex-row border-t border-b border-white/10 min-h-[500px]">
          {services.map((svc, idx) => (
            <ServiceCard key={svc.id} service={svc} index={idx} />
          ))}
        </div>

        {/* Bottom Call to Action Section */}
        <div className="mt-32 border-t border-white/10 pt-20 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
                Ready to transform <br />
                <span className="text-primary">your mission?</span>
              </h2>
           </div>
           <a 
            href="/contact"
            className="group relative px-12 py-6 bg-white text-black font-black text-xl uppercase tracking-tighter overflow-hidden rounded-none"
           >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">Start Collaboration</span>
           </a>
        </div>
      </div>
      
      {/* Decorative Car UI HUD Elements */}
      <div className="fixed bottom-10 left-10 hidden lg:block opacity-20 pointer-events-none">
         <div className="font-mono text-[10px] space-y-1">
            <div>// STATUS: NOMINAL</div>
            <div>// ENGINE: CREATIVE_CORE_V4.2</div>
            <div>// LATENCY: 2.1MS</div>
         </div>
      </div>
    </main>
  );
}
