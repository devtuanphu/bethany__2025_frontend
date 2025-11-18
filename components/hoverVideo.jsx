"use client";

import { useEffect, useRef } from "react";

export default function HoverVideo({ src, className = "" }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    // Force transparent background for Safari - more aggressive approach
    const forceTransparency = () => {
      if (video) {
        // Remove all possible background properties
        video.style.backgroundColor = 'transparent';
        video.style.background = 'transparent';
        video.style.backgroundImage = 'none';
        video.style.backgroundSize = '0 0';
        video.style.border = 'none';
        video.style.outline = 'none';
        
        // Force Safari to respect transparency using setProperty
        if (video.style.setProperty) {
          video.style.setProperty('background-color', 'transparent', 'important');
          video.style.setProperty('background', 'transparent', 'important');
          video.style.setProperty('background-image', 'none', 'important');
          video.style.setProperty('-webkit-background-size', '0 0', 'important');
          video.style.setProperty('background-size', '0 0', 'important');
          video.style.setProperty('border', 'none', 'important');
          video.style.setProperty('outline', 'none', 'important');
          video.style.setProperty('object-fit', 'contain', 'important');
        }
        
        // Remove any computed background color Safari might have set
        const computedStyle = window.getComputedStyle(video);
        const bgColor = computedStyle.backgroundColor;
        
        // Check if Safari has set a black or non-transparent background
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          // Force transparent multiple times
          video.style.setProperty('background-color', 'transparent', 'important');
          video.style.setProperty('background', 'transparent', 'important');
          
          // Try to remove the background using CSS custom property
          video.style.setProperty('--safari-bg-fix', 'transparent', 'important');
        }
        
        // Also try to access the video element's internal rendering
        // This is a workaround for Safari's video rendering
        if (video.webkitDecodedFrameCount !== undefined) {
          // Video is decoded, force repaint
          video.style.display = 'none';
          video.offsetHeight; // Trigger reflow
          video.style.display = '';
        }
      }
      if (container) {
        container.style.backgroundColor = 'transparent';
        container.style.background = 'transparent';
        container.style.backgroundImage = 'none';
        if (container.style.setProperty) {
          container.style.setProperty('background-color', 'transparent', 'important');
          container.style.setProperty('background', 'transparent', 'important');
          container.style.setProperty('background-image', 'none', 'important');
        }
      }
    };

    // Force transparency immediately and on video load
    forceTransparency();
    
    // Use multiple event listeners to ensure transparency is maintained
    const handleLoadedData = () => {
      forceTransparency();
      // Force again after a short delay to override Safari's default
      setTimeout(forceTransparency, 50);
    };
    
    const handleCanPlay = () => {
      forceTransparency();
    };
    
    const handleLoadedMetadata = () => {
      forceTransparency();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', forceTransparency);

    const handleMouseEnter = () => {
      // Only load video when hovered (lazy load)
      if (video && video.readyState === 0) {
        // readyState 0 = HAVE_NOTHING - video hasn't started loading
        video.load();
      }
      
      if (video && video.readyState >= 2) {
        // readyState 2 = HAVE_CURRENT_DATA, 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
        forceTransparency();
        video.play().catch(() => {
          // Ignore autoplay errors silently
        });
      } else if (video) {
        // If video not ready, wait for it
        const handleLoaded = () => {
          forceTransparency();
          video.play().catch((e) => {
            // Ignore autoplay errors silently
          });
        };
        video.addEventListener("loadeddata", handleLoaded, { once: true });
        video.addEventListener("canplay", handleLoaded, { once: true });
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

    // DON'T preload video - only load when hovered to save resources
    // video.load(); // Removed - only load on hover

    // DISABLED MutationObserver - it was causing performance issues
    // The transparency is already set via inline styles, so this is redundant
    // let observerTimeout = null;
    // const observer = new MutationObserver(() => {
    //   // Throttle transparency updates
    //   if (observerTimeout) return;
    //   observerTimeout = setTimeout(() => {
    //     forceTransparency();
    //     observerTimeout = null;
    //   }, 100);
    // });
    // 
    // observer.observe(video, { attributes: true, attributeFilter: ['style'] });
    // observer.observe(container, { attributes: true, attributeFilter: ['style'] });

    return () => {
      if (parentGroup) {
        parentGroup.removeEventListener("mouseenter", handleMouseEnter);
        parentGroup.removeEventListener("mouseleave", handleMouseLeave);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', forceTransparency);
      // observer.disconnect();
      // if (observerTimeout) {
      //   clearTimeout(observerTimeout);
      // }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ 
        backgroundColor: 'transparent', 
        background: 'transparent',
        isolation: 'isolate',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Safari fix: Use a pseudo-element overlay to hide background */}
      <video
        ref={videoRef}
        src={src}
        width={600}
        height={400}
        loop
        muted
        playsInline
        preload="none"
        className="rounded-xl"
        style={{ 
          backgroundColor: 'transparent', 
          background: 'transparent',
          backgroundImage: 'none',
          backgroundSize: '0 0',
          isolation: 'isolate',
          // Use normal blend mode
          mixBlendMode: 'normal',
          WebkitBackgroundSize: '0 0',
          // Force Safari to use alpha channel
          objectFit: 'contain',
          // Remove any default styling
          border: 'none',
          outline: 'none',
          // Use CSS filter to help with transparency
          filter: 'none',
          WebkitFilter: 'none'
        }}
      />
      {/* Safari-specific overlay to mask any background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          backgroundColor: 'transparent',
          mixBlendMode: 'multiply',
          opacity: 0,
          zIndex: 1
        }}
        className="safari-video-overlay"
      />
    </div>
  );
}

