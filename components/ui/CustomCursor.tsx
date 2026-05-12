"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      document.body.appendChild(trail);
      trails.push(trail);
    }
    trailsRef.current = trails;

    let mouseX = 0;
    let mouseY = 0;
    const trailPositions = trails.map(() => ({ x: 0, y: 0 }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        cursor.classList.add("hovering");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("hovering");
    };

    function animateTrails() {
      trailPositions.forEach((pos, i) => {
        const leader = i === 0 ? { x: mouseX, y: mouseY } : trailPositions[i - 1];
        pos.x += (leader.x - pos.x) * 0.3;
        pos.y += (leader.y - pos.y) * 0.3;
        const trail = trails[i];
        trail.style.left = `${pos.x}px`;
        trail.style.top = `${pos.y}px`;
        trail.style.transform = "translate(-50%, -50%)";
        trail.style.opacity = `${0.4 - i * 0.08}`;
        trail.style.width = `${8 - i * 1.2}px`;
        trail.style.height = `${8 - i * 1.2}px`;
      });
      requestAnimationFrame(animateTrails);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animateTrails();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      trails.forEach((t) => t.remove());
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
