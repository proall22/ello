"use client";

import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen text-white pt-32 pb-24">
      <Navbar />

      <div className="container mx-auto px-6 max-w-4xl space-y-24">
        
        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Who We Are
          </h1>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-transparent rounded-full" />
          <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed max-w-2xl mx-auto">
            We are a collective of digital creatives and strategists based in Ethiopia,
            building the future of advertising with global standards and local roots.
          </p>
        </section>

        {/* VISION */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Our Vision
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-secondary to-transparent rounded-full" />
          <p className="text-lg md:text-xl text-foreground font-light leading-relaxed max-w-2xl mx-auto">
            To become the leading cinematic storytelling and digital branding agency in East Africa,
            empowering businesses to scale through world-class creative systems.
          </p>
        </section>

        {/* MISSION */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Our Mission
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-transparent rounded-full" />
          <p className="text-lg md:text-xl text-foreground font-light leading-relaxed max-w-2xl mx-auto">
            We combine insight, high-end strategy, and cutting-edge technology to build
            brands that leave a lasting impact. Like the farmer who builds the future
            with what he has, we nurture robust digital growth for our partners.
          </p>
        </section>

      </div>
    </main>
  );
}
