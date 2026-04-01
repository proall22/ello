"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(" ");
}

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Services", href: "/services" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
	{ name: "Let's Build Together", href: "/contact" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 120);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Prevent scrolling when menu is open
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	return (
		<>
			<header
				className={cn(
					"fixed top-0 w-full z-[100] transition-all duration-[350ms] ease-out pointer-events-none",
					menuOpen ? "py-6" : scrolled ? "py-4" : "py-6",
				)}
			>
				<div
					className={cn(
						"absolute inset-0 -z-10 backdrop-blur-[12px] transition-opacity duration-[350ms] ease-out",
						scrolled || menuOpen ? "opacity-100" : "opacity-0",
					)}
				/>
				<div className="container mx-auto px-6 flex items-center justify-between">
					{/* LOGO */}
					<Link
						href="/"
						className="hover:scale-105 transition-transform duration-300 relative z-[101] pointer-events-auto"
						onClick={() => setMenuOpen(false)}
					>
						<img
							src="/assets/logo/logoEllolCreative_remoevd_bg.png"
							alt="Ellol Digital Creatives"
							className="h-14 md:h-20 w-auto object-contain nav-logo-blend relative z-10 opacity-95 hover:opacity-100"
						/>
					</Link>

					{/* MENU CTA */}
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="flex flex-col justify-center items-center w-16 h-16 gap-2.5 group z-[101] cursor-pointer pointer-events-auto mix-blend-difference"
						aria-label="Toggle Menu"
					>
						<span
							className={cn(
								"block w-10 h-0.5 bg-white transition-all duration-300",
								menuOpen ? "rotate-45 translate-y-3" : "group-hover:scale-110",
							)}
						/>
						<span
							className={cn(
								"block w-10 h-0.5 bg-white transition-all duration-300",
								menuOpen ? "opacity-0" : "group-hover:w-8",
							)}
						/>
						<span
							className={cn(
								"block w-10 h-0.5 bg-white transition-all duration-300",
								menuOpen
									? "-rotate-45 -translate-y-3"
									: "group-hover:scale-110",
							)}
						/>
					</button>
				</div>
			</header>

			{/* OVERLAY MENU */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
						className="fixed inset-0 z-[90] bg-black/95 flex flex-col items-center justify-center p-6 overflow-hidden"
					>
						<nav className="flex flex-col items-center gap-6 md:gap-10 w-full">
							{navLinks.map((link, i) => (
								<motion.div
									key={link.name}
									className="w-full flex justify-center"
									initial={{ y: 40, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 20, opacity: 0 }}
									transition={{
										duration: 0.5,
										delay: i * 0.05,
										ease: [0.33, 1, 0.68, 1],
									}}
								>
									{link.name === "Let's Build Together" ? (
										<div className="text-center w-full">
											<Link
												href={link.href}
												onClick={() => setMenuOpen(false)}
												className={cn(
													"nav-link-glow pointer-events-auto",
													"text-4xl md:text-7xl font-black uppercase tracking-[0.1em] transition-all duration-500",
													"text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:drop-shadow-[0_0_30px_rgba(249,115,22,0.8)]",
												)}
											>
												{link.name}
											</Link>
										</div>
									) : (
										<Link
											href={link.href}
											onClick={() => setMenuOpen(false)}
											className={cn(
												"nav-link-glow pointer-events-auto",
												"text-4xl md:text-7xl font-black uppercase tracking-[0.1em] transition-all duration-500",
												"text-white/80 hover:text-white hover:tracking-[0.2em] mix-blend-screen",
											)}
										>
											{link.name}
										</Link>
									)}
								</motion.div>
							))}
						</nav>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6 }}
							className="absolute bottom-12 flex flex-col items-center gap-4 text-white/50 text-sm tracking-widest font-light"
						>
							<p>Addis Ababa, Ethiopia</p>
							<div className="flex gap-8">
								<a href="#" className="hover:text-primary transition-colors">
									Instagram
								</a>
								<a href="#" className="hover:text-primary transition-colors">
									LinkedIn
								</a>
								<a href="#" className="hover:text-primary transition-colors">
									Twitter
								</a>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
