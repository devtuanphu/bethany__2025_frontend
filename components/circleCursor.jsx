"use client";

import React, { useEffect, useRef, useState } from "react";

const CircleCursor = () => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${x + 3}px`;
        cursorRef.current.style.top = `${y + 6}px`;

        const isNearTop = y < 4;
        const isNearRight = x > window.innerWidth - 20;
        const isNearBottom = y > window.innerHeight - 8;

        if (isNearTop || isNearRight || isNearBottom) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const clickEffect = () => {
      if (cursorRef.current) {
        cursorRef.current.animate(
          [
            { transform: "translate(-50%, -50%) scale(1)" },
            { transform: "translate(-50%, -50%) scale(1.2)" },
            { transform: "translate(-50%, -50%) scale(1)" },
          ],
          {
            duration: 300,
            easing: "ease-in-out",
          }
        );
      }
    };

    document.addEventListener("click", clickEffect);
    return () => document.removeEventListener("click", clickEffect);
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed w-[40px] h-[40px] bg-lime-300 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] transition-opacity duration-200 ${
        isVisible ? "opacity-50" : "opacity-0"
      }`}
    />
  );
};

export default CircleCursor;
