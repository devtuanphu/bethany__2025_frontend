"use client";

import { useEffect, useRef, memo } from "react";

function VideoWrapper({ src, autoPlay, className, isAboveFold }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    // Use Intersection Observer to pause videos when out of viewport
    // This saves CPU while keeping videos visible and autoplaying
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Resume playing when in viewport
            if (video.paused) {
              video.play().catch(() => {
                // Ignore autoplay errors silently
              });
            }
          } else {
            // Pause when out of viewport to save CPU (but keep video loaded)
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        rootMargin: "50px", // Start checking 50px before entering viewport
        threshold: 0.1,
      }
    );

    // Wait a bit for video to load before observing
    const timeoutId = setTimeout(() => {
      observer.observe(video);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      controls={false}
      autoPlay={autoPlay}
      playsInline
      preload="metadata"
      className={className}
      muted
      loop
      style={{ 
        backgroundColor: 'transparent', 
        background: 'transparent',
        backgroundImage: 'none',
        backgroundSize: '0 0',
        WebkitBackgroundSize: '0 0'
      }}
    />
  );
}

export default memo(VideoWrapper);

