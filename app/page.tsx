"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasSequence from "./components/CanvasSequence";
import HeroFarmer from "./components/HeroFarmer";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger);

const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];

function GlobalGrain() {
	return (
		<div className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-1000 opacity-[0.04]">
			<div
				className="w-full h-full absolute inset-0 mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAAD9tt+XAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj76XGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AgKCQ8yN4N5YQAAACJJREFUOMtjdCAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGB4cDAsGA4MGIwMGIwMGIwMGIwMCQYGBgEGBuGBAcGA4MBIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIwMGIvx3P5T+6AAAAAElFTkSuQmCC")`,
					backgroundSize: "120px 120px",
				}}
			/>
		</div>
	);
}

function GlobalVignette() {
	return (
		<div className="pointer-events-none fixed inset-0 z-[60] shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
	);
}

function ParallaxLayer({
	depth = 1,
	className = "",
	children,
}: {
	depth?: number;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			data-parallax={depth}
			className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
		>
			{children}
		</div>
	);
}

function SceneText({
	children,
	position = "center",
	delay = 0,
	depth = 0.5,
	parallaxX = 0,
	className = "",
}: {
	children: React.ReactNode;
	position?: "left" | "right" | "center";
	delay?: number;
	depth?: number;
	parallaxX?: number;
	className?: string;
}) {
	let layoutClasses = "";
	if (position === "center")
		layoutClasses =
			"flex flex-col items-center justify-center text-center w-full";
	if (position === "left")
		layoutClasses =
			"flex flex-col justify-center w-full md:w-1/2 pl-6 md:pl-24 text-left";
	if (position === "right")
		layoutClasses =
			"flex flex-col justify-center items-end text-right w-full md:w-1/2 md:ml-auto pr-6 md:pr-24";

	return (
		<div
			data-parallax={depth}
			data-parallax-x={parallaxX}
			className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
		>
			<div
				className={`h-full ${layoutClasses} absolute inset-0 z-20 pointer-events-none`}
			>
				<motion.div
					initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 1.4, ease: easeOutCubic, delay }}
					className="pointer-events-auto p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative group"
				>
					{/* Targeted brightness reduction overlay - "Protecting the text from the sun" */}
					<div
						className="absolute inset-0 z-[-1] backdrop-blur-md bg-black/40"
						style={{ backdropFilter: "brightness(0.7) blur(8px)" }}
					/>

					<div className="relative z-10">{children}</div>
				</motion.div>
			</div>
		</div>
	);
}

function TextOverlay({
	position = "center",
}: {
	position?: "left" | "right" | "center" | "bottom";
}) {
	let bgClass =
		"bg-gradient-to-t from-black/75 via-black/30 to-transparent backdrop-blur-[1px]";
	if (position === "left")
		bgClass =
			"bg-gradient-to-r from-black/75 via-black/30 to-transparent backdrop-blur-[1px]";
	if (position === "right")
		bgClass =
			"bg-gradient-to-l from-black/75 via-black/30 to-transparent backdrop-blur-[1px]";

	return (
		<div className={`absolute inset-0 z-10 pointer-events-none ${bgClass}`} />
	);
}

export default function Home() {
	const [preloaderDone, setPreloaderDone] = useState(false);

	useEffect(() => {
		// Smoothen out scroll behavior across devices
		ScrollTrigger.normalizeScroll(true);

		if (preloaderDone) {
			// Force a re-calculation of all pinning offsets once preloader is gone
			const timer = setTimeout(() => {
				ScrollTrigger.refresh(true);
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [preloaderDone]);

	return (
		<main className="bg-background min-h-screen text-white overflow-hidden relative">
			{!preloaderDone && (
				<Preloader onComplete={() => setPreloaderDone(true)} />
			)}

			<GlobalGrain />
			<GlobalVignette />

			<div
				className={`relative z-[100] transition-opacity duration-1000 ${preloaderDone ? "opacity-100" : "opacity-0"}`}
			>
				<Navbar />
			</div>

			<HeroFarmer />

			<CanvasSequence
				id="scene_02"
				folder="farmer"
				frameCount={240}
				ariaLabel="Every Business Begins as a Seed"
			>
				<TextOverlay position="left" />
				<SceneText position="left">
					<h2 className="text-3xl md:text-[54px] font-bold tracking-tight leading-tight mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,1)] max-w-2xl text-headline">
						Every Business Begins as a Seed
					</h2>
					<p className="text-xl md:text-[26px] text-primary/90 font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
						Your idea is a seed. <br />
						You invested time, effort, and belief to grow it.
					</p>
				</SceneText>
			</CanvasSequence>

			<CanvasSequence
				id="scene_03"
				folder="seed_transformation"
				frameCount={240}
				ariaLabel="Growth Needs Direction"
			>
				<TextOverlay position="right" />
				<SceneText position="right">
					<h2 className="text-3xl md:text-[54px] font-bold leading-tight max-w-2xl drop-shadow-[0_4px_24px_rgba(0,0,0,1)] text-headline mb-6">
						Growth Needs Direction
					</h2>
					<p className="text-xl md:text-[26px] text-secondary font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
						You built your product. <br />
						You developed your service. <br />
						Now it carries value. <br />
						But value must be understood.
					</p>
				</SceneText>
			</CanvasSequence>

			<CanvasSequence
				id="scene_04"
				folder="pillars"
				frameCount={240}
				ariaLabel="From Effort to Creation"
			>
				<TextOverlay position="center" />
				<SceneText position="center" parallaxX={0.25}>
					<h2 className="text-3xl md:text-[64px] font-black tracking-tight mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,1)] uppercase text-headline">
						From Effort to Creation
					</h2>
					<p className="text-lg md:text-[24px] text-foreground font-light tracking-widest max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
						Like grain becoming bread, <br />
						your business has become something real. <br />
						Something useful. Something meaningful. <br />
						<span className="text-primary font-bold block mt-4 text-2xl tracking-[0.3em]">
							But YOU NEED MORE.
						</span>
					</p>
				</SceneText>
			</CanvasSequence>

			<CanvasSequence
				id="scene_05"
				folder="to_city"
				frameCount={240}
				ariaLabel="Now It Must Be Experienced"
			>
				<TextOverlay position="left" />
				<SceneText position="left">
					<h2 className="text-3xl md:text-[54px] font-bold leading-tight max-w-2xl drop-shadow-[0_4px_24px_rgba(0,0,0,1)] text-headline mb-6">
						Now It Must Be Experienced
					</h2>
					<p className="text-xl md:text-[26px] text-foreground font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-xl">
						Presentation is everything. <br />
						Your product must reach people <br />
						in a way that{" "}
						<span className="text-primary font-bold">excites them</span>, <br />
						connects with them, <br />
						and makes them choose you.
					</p>
				</SceneText>
			</CanvasSequence>

			<CanvasSequence
				id="scene_06"
				folder="drone"
				frameCount={150}
				ariaLabel="This Is Where Ellol Creatives Comes In"
			>
				<TextOverlay position="right" />
				<SceneText position="right">
					<h2 className="text-3xl md:text-[48px] font-bold mb-8 tracking-tight text-headline drop-shadow-[0_4px_24px_rgba(0,0,0,1)] max-w-xl">
						This Is Where <span className="text-primary">Ellol Creatives</span>{" "}
						Comes In
					</h2>
					<div className="flex flex-col gap-4 text-xl md:text-[24px] text-foreground font-light text-right max-w-xl">
						<p className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
							We see your business the way a farmer sees a seed.
						</p>
						<div className="flex flex-col gap-2 font-medium tracking-[0.2em] uppercase text-primary text-sm md:text-lg">
							<span>With vision.</span>
							<span>With strategy.</span>
							<span>With purpose.</span>
						</div>
						<p className="mt-4 border-r-4 border-primary pr-6 leading-relaxed text-lg md:text-xl font-normal text-headline drop-shadow-lg italic">
							Technology, Creativity, and Understanding are the tools we use to
							transform your work into powerful communication.
						</p>
					</div>
				</SceneText>
			</CanvasSequence>

			<CanvasSequence
				id="scene_07"
				folder="harvest_sucess"
				frameCount={240}
				ariaLabel="Final Call to Action"
			>
				<TextOverlay position="center" />
				<SceneText position="center">
					<h2 className="text-5xl md:text-[72px] font-bold tracking-tight mb-12 drop-shadow-2xl text-headline">
						Let’s build something{" "}
						<span className="text-primary glow-text">impactful</span>
					</h2>
					<a
						href="/contact"
						className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white rounded-full text-xl font-bold tracking-widest uppercase transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.8)] pointer-events-auto"
					>
						Contact Us
					</a>
				</SceneText>
			</CanvasSequence>
		</main>
	);
}
