"use client";

import { useEffect, useRef } from "react";

export default function HoverVideo({ src, className = "" }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    const handleMouseEnter = () => {
      if (video && video.readyState >= 2) {
        // readyState 2 = HAVE_CURRENT_DATA, 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
        video.play().catch(() => {
          // Ignore autoplay errors silently
        });
      } else {
        // If video not ready, wait for it
        video.addEventListener("loadeddata", () => {
          video.play().catch((e) => {
            // Ignore autoplay errors silently
          });
        }, { once: true });
      }
    };

    const handleMouseLeave = () => {
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset to start
      }
    };

    // Listen to parent group hover
    const parentGroup = container.closest(".group");
    if (parentGroup) {
      parentGroup.addEventListener("mouseenter", handleMouseEnter);
      parentGroup.addEventListener("mouseleave", handleMouseLeave);
    }

    // Preload video when component mounts
    video.load();

    return () => {
      if (parentGroup) {
        parentGroup.removeEventListener("mouseenter", handleMouseEnter);
        parentGroup.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={src}
        width={600}
        height={400}
        loop
        muted
        playsInline
        preload="metadata"
        className="rounded-xl"
      />
    </div>
  );
}

