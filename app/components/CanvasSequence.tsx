"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface CanvasSequenceProps {
  folder: string;
  frameCount: number;
  id: string;
  children?: ReactNode;
  onProgress?: (progress: number) => void;
  priority?: boolean;
  ariaLabel?: string;
}

export default function CanvasSequence({ folder, frameCount, id, children, onProgress, priority = false, ariaLabel }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stable refs to prevent GSAP tears
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(false);
  const onProgressRef = useRef(onProgress);

  // Keep latest progress callback without triggering effects
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const container = containerRef.current;

    if (!canvas || !ctx || !container) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const obj = { frame: 0 };

    const drawImage = (img: HTMLImageElement) => {
      if (!ctx || !canvas) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    const loadImages = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(4, "0");
        img.src = `/assets/${folder}/frame_${paddedIndex}.jpg`;
        imagesRef.current.push(img);

        if (i === 1) {
          img.onload = () => drawImage(img);
        }
      }
    };

    let observer: IntersectionObserver | null = null;

    if (priority) {
      loadImages();
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadImages();
          observer?.disconnect();
        }
      }, { rootMargin: "1500px" });
      observer.observe(container);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(obj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        const frameIndex = Math.round(obj.frame);

        if (onProgressRef.current) {
          onProgressRef.current(obj.frame / (frameCount - 1));
        }

        const currentImg = imagesRef.current[frameIndex];
        if (currentImg) {
          requestAnimationFrame(() => {
            if (currentImg.complete) {
              drawImage(currentImg);
            }
          });
        }
      }
    }, 0);

    // Apply native GSAP Parallax to layered children
    const parallaxLayers = container.querySelectorAll("[data-parallax], [data-parallax-x]");
    parallaxLayers.forEach(layer => {
      const depthY = parseFloat(layer.getAttribute("data-parallax") || "0");
      const depthX = parseFloat(layer.getAttribute("data-parallax-x") || "0");
      
      if (depthY !== 0 || depthX !== 0) {
        // Scroll distance is 300% (3 viewport heights)
        const totalDistanceY = window.innerHeight * 3 * depthY;
        const totalDistanceX = window.innerWidth * 3 * depthX;

        // Start from positive offset, scrub to negative offset
        gsap.set(layer, { 
          y: totalDistanceY / 2,
          x: totalDistanceX / 2 
        });

        tl.to(layer, {
          y: -totalDistanceY / 2,
          x: -totalDistanceX / 2,
          ease: "none"
        }, 0);
      }
    });

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.imageSmoothingQuality = "high";
      
      const currentImg = imagesRef.current[Math.round(obj.frame)];
      if (currentImg && currentImg.complete) {
        drawImage(currentImg);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === container) {
          (t as any).kill(true); // Revert all pinning and kill
        }
      });
    };
  }, [folder, frameCount, priority, id]);

  return (
    <section id={id} ref={containerRef} aria-label={ariaLabel} className="min-h-[100dvh] h-[100dvh] w-full relative bg-background overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-10 w-full h-full flex items-center">
        {children}
      </div>
    </section>
  );
}
