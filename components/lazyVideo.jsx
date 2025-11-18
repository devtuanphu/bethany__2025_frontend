"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyVideo({ src, autoPlay = false, className = "" }) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use Intersection Observer to detect when video is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Only load video when it's actually in viewport
            if (!shouldLoad) {
              setShouldLoad(true);
            }
          } else {
            setIsInView(false);
            // Pause video when out of viewport to save resources
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    // Auto play only if in viewport and autoPlay is true
    if (isInView && autoPlay) {
      video.play().catch(() => {
        // Ignore autoplay errors silently
      });
    } else if (!isInView) {
      video.pause();
    }
  }, [isInView, autoPlay, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      controls={false}
      autoPlay={autoPlay && isInView}
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      className={className}
      muted
      loop
      style={{ backgroundColor: 'transparent', background: 'transparent' }}
    />
  );
}

