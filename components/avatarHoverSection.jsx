"use client";

import HoverVideo from "./hoverVideo";

export default function AvatarHoverSection() {
  return (
    <div className="hidden desktop:block relative group">
      <h1 className="text-[18vw]  transition-opacity duration-300 hover:text-[#17FD5F]">
        hi, helloooo
      </h1>

      <div 
        className="desktop:absolute right-[15%] top-[16%] opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
        style={{ 
          backgroundColor: 'transparent', 
          background: 'transparent',
          backgroundImage: 'none',
          isolation: 'isolate'
        }}
      >
        <HoverVideo src="/avatar-mini.mov" />
      </div>
    </div>
  );
}

