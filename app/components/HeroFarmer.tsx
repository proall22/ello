"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Particle {
	id: number;
	width: number;
	height: number;
	x: number;
	y: number;
	opacity: number;
	duration: number;
	delay: number;
}

export default function HeroFarmer() {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const [particles, setParticles] = useState<Particle[]>([]);

	useEffect(() => {
		// Generate particles only on the client to prevent hydration mismatch
		const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
			id: i,
			width: Math.random() * 2 + 1,
			height: Math.random() * 2 + 1,
			x: Math.random() * 100,
			y: Math.random() * 100,
			opacity: Math.random() * 0.5,
			duration: Math.random() * 10 + 15,
			delay: Math.random() * -20,
		}));
		setParticles(newParticles);

		const container = containerRef.current;
		const image = imageRef.current;
		const text = textRef.current;

		if (!container || !image || !text) return;

		// Timeline for pinning and zoom
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: "top top",
				end: "+=120%",
				scrub: 1,
				pin: true,
				pinType: "fixed",
				anticipatePin: 1,
				fastScrollEnd: true,
				invalidateOnRefresh: true,
			},
		});

		// Zoom-in effect (1.0 to 1.15x)
		tl.to(
			image,
			{
				scale: 1.15,
				ease: "none",
			},
			0,
		);

		// Initial state: Fully visible and sharp
		gsap.set(text, { x: 0, opacity: 1, filter: "blur(0px)" });

		// Exit animation: Slide up and fade out as scroll nears completion
		tl.to(
			text,
			{
				y: -100,
				opacity: 0,
				filter: "blur(10px)",
				ease: "power2.inOut",
				duration: 0.6,
			},
			0.4,
		); // Start exit after 40% of scroll progress

		return () => {
			if (tl) tl.kill();
			ScrollTrigger.getAll().forEach((t) => {
				if (t.vars.trigger === container) (t as any).kill(true);
			});
		};
	}, []);

	return (
		<section
			ref={containerRef}
			className="min-h-[100dvh] h-[100dvh] w-full relative overflow-hidden bg-[#0B0B0B]"
		>
			{/* Cinematic Hero Image */}
			<img
				ref={imageRef}
				src="/assets/scene_01_hero_farmer/image.webp"
				alt="The Hero Farmer"
				loading="eager"
				className="absolute inset-0 w-full h-full object-cover grayscale-[10%] brightness-[0.85] contrast-[1.1]"
			/>

			{/* Cinematic Grading Overlays */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
			<div className="absolute inset-0 bg-orange-600/5 mix-blend-overlay pointer-events-none" />

			{/* Cinematic Dust Particles Loop (GPU Optimized) */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{particles.map((p) => (
					<div
						key={p.id}
						className="absolute bg-white/20 rounded-full blur-[1px] animate-float"
						style={{
							width: `${p.width}px`,
							height: `${p.height}px`,
							left: `${p.x}%`,
							top: `${p.y}%`,
							opacity: p.opacity,
							filter: "blur(0.5px)",
							animationDuration: `${p.duration}s`,
							animationDelay: `${p.delay}s`,
							transform: "translate3d(0,0,0)", // Force GPU acceleration
						}}
					/>
				))}
			</div>

			<div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

			<div
				ref={textRef}
				className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-12 pointer-events-none text-center"
			>
				<motion.h1
					whileHover={{
						scale: 1.02,
						textShadow: "0 0 30px rgba(249, 115, 22, 0.6)",
					}}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="text-3xl sm:text-4xl md:text-6xl lg:text-[100px] font-black text-3d tracking-tight leading-[1.1] transition-all duration-700 ease-out max-w-7xl mx-auto break-words pointer-events-auto cursor-default"
				>
					ዘሩ ማኛ ሰርገኛ ጉርሻ ሆኖ እንደማየት ምን ያረካል?
				</motion.h1>
			</div>

			{/* Subtle Bottom Glow */}
			<div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-950/30 to-transparent pointer-events-none" />
		</section>
	);
}
