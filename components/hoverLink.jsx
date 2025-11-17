"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function HoverLink({
  label,
  mediaSrc,
  width = 300,
  height = 200,
}) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const linkRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (show && linkRef.current) {
      const updatePosition = () => {
        if (!linkRef.current) return;
        
        const linkRect = linkRef.current.getBoundingClientRect();
        const imageWidth = width;
        const imageHeight = height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate scrollbar width if exists
        const scrollbarWidth = viewportWidth - document.documentElement.clientWidth;

        // Calculate center position of the link
        let x = linkRect.left + linkRect.width / 2;
        let y = linkRect.top + linkRect.height / 2;

        // Adjust for viewport boundaries with padding
        const padding = 10;
        
        // Check right edge (account for scrollbar)
        if (x + imageWidth / 2 > viewportWidth - scrollbarWidth - padding) {
          x = viewportWidth - imageWidth / 2 - scrollbarWidth - padding;
        }
        // Check left edge
        if (x - imageWidth / 2 < padding) {
          x = imageWidth / 2 + padding;
        }
        // Check bottom edge
        if (y + imageHeight / 2 > viewportHeight - padding) {
          y = viewportHeight - imageHeight / 2 - padding;
        }
        // Check top edge
        if (y - imageHeight / 2 < padding) {
          y = imageHeight / 2 + padding;
        }
        
        // Update position
        setPosition({ x, y });
      };

      // Initial position calculation
      updatePosition();
      
      // Update on scroll and resize with requestAnimationFrame for smoothness
      let rafId;
      const handleUpdate = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updatePosition);
      };

      window.addEventListener("scroll", handleUpdate, { passive: true });
      window.addEventListener("resize", handleUpdate, { passive: true });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("scroll", handleUpdate);
        window.removeEventListener("resize", handleUpdate);
      };
    }
  }, [show, width, height]);

  return (
    <span className="relative inline-block">
      <Link
        ref={linkRef}
        href="#"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-[#17FD5F] hover:no-underline relative cursor-pointer"
      >
        {label}
      </Link>

      {show && (
        <div
          ref={imageRef}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="fixed z-[999] transition-opacity duration-200"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
            width: `${width}px`,
            height: `${height}px`,
            pointerEvents: "auto",
          }}
        >
          <Image
            src={mediaSrc}
            alt={`Preview for ${label}`}
            width={width}
            height={height}
            className="w-full h-full object-contain"
            priority
            unoptimized
          />
        </div>
      )}
    </span>
  );
}
