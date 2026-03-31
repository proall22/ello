"use client";

import Navbar from "../components/Navbar";
import { Lightbulb, PenTool, Radio, Rocket, Activity, Zap } from "lucide-react";

const services = [
  {
    title: "Strategy",
    description: "Deep research and insight-driven positioning for emerging brands.",
    icon: <Activity className="w-8 h-8 text-primary" />,
  },
  {
    title: "Creative Production",
    description: "High-end visual storytelling and cinematic execution.",
    icon: <PenTool className="w-8 h-8 text-secondary" />,
  },
  {
    title: "Campaign Execution",
    description: "Full-scale rollout of narratives across multiple channels.",
    icon: <Rocket className="w-8 h-8 text-primary" />,
  },
  {
    title: "Digital Branding",
    description: "Cohesive visual identity systems ready for global scale.",
    icon: <Lightbulb className="w-8 h-8 text-secondary" />,
  },
  {
    title: "Drone Advertising",
    description: "Modern aerial display campaigns and smart visibility platforms.",
    icon: <Radio className="w-8 h-8 text-primary" />,
  },
  {
    title: "Content Systems",
    description: "Scalable digital assets and automated content systems.",
    icon: <Zap className="w-8 h-8 text-secondary" />,
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-background min-h-screen text-white pt-32 pb-24">
      <Navbar />
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-foreground font-light">
            We provide end-to-end creative and strategic solutions. From initial
            insight to final execution, we grow ideas into strong brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="group bg-surface border border-white/5 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)] hover:border-primary/30"
            >
              <div className="mb-6 p-4 bg-background inline-flex rounded-xl group-hover:scale-110 transition-transform duration-500">
                {svc.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{svc.title}</h3>
              <p className="text-foreground leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
