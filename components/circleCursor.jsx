"use client";

import React, { useEffect, useRef, useState } from "react";

const CircleCursor = () => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  // Smooth cursor movement using requestAnimationFrame
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animationFrameId = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const animate = () => {
      // Smooth interpolation for better performance
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Check visibility only when position changes significantly
      const dx = Math.abs(e.clientX - lastPositionRef.current.x);
      const dy = Math.abs(e.clientY - lastPositionRef.current.y);

      if (dx > 5 || dy > 5) {
        const isNearEdge = 
          e.clientY < 4 || 
          e.clientX > window.innerWidth - 20 || 
          e.clientY > window.innerHeight - 8;

        if (isVisibleRef.current !== !isNearEdge) {
          isVisibleRef.current = !isNearEdge;
          setIsVisible(!isNearEdge);
        }

        lastPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Click animation effect
  useEffect(() => {
    const handleClick = () => {
      if (cursorRef.current) {
        cursorRef.current.animate(
          [
            { transform: `translate(${lastPositionRef.current.x}px, ${lastPositionRef.current.y}px) translate(-50%, -50%) scale(1)` },
            { transform: `translate(${lastPositionRef.current.x}px, ${lastPositionRef.current.y}px) translate(-50%, -50%) scale(1.2)` },
            { transform: `translate(${lastPositionRef.current.x}px, ${lastPositionRef.current.y}px) translate(-50%, -50%) scale(1)` },
          ],
          {
            duration: 300,
            easing: "ease-in-out",
          }
        );
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden desktop:block fixed w-[30px] h-[30px] bg-lime-300 rounded-full pointer-events-none z-[9999] transition-opacity duration-200"
      style={{ 
        left: 0,
        top: 0,
        willChange: 'transform',
        opacity: isVisible ? 0.5 : 0,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default CircleCursor;
