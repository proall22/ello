"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface CanvasSequenceProps {
  folder: string;
  frameCount: number;
  id: string;
  children?: ReactNode;
}

export default function CanvasSequence({ folder, frameCount, id, children }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const container = containerRef.current;
    
    if (!canvas || !ctx || !container) return;

    // Set canvas dimensions explicitly for clearing & aspect matching
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
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
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(4, "0");
        img.src = `/assets/${folder}/frame_${paddedIndex}.jpg`;
        images.push(img);
        
        if (i === 1) {
          img.onload = () => drawImage(img);
        }
      }
    };

    loadImages();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        scrub: 1, 
        pin: true,  
        anticipatePin: 1,
      }
    });

    tl.to(obj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        const frameIndex = Math.round(obj.frame);
        if (images[frameIndex]) {
          requestAnimationFrame(() => {
            if (images[frameIndex].complete) {
              drawImage(images[frameIndex]);
            }
          });
        }
      }
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = images[Math.round(obj.frame)];
      if (img && img.complete) {
        drawImage(img);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
    };
  }, [folder, frameCount]);

  return (
    <section id={id} ref={containerRef} className="h-screen w-full relative bg-background overflow-hidden">
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
