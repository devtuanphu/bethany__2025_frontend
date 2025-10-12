"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function HoverLink({
  label,
  mediaSrc,
  width = 300,
  height = 200,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <Link
        href="#"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-[#17FD5F] hover:no-underline relative cursor-pointer"
      >
        {label}
      </Link>

      {show && (
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] flex items-center justify-center"
          style={{ width, height }}
        >
          <Image
            src={mediaSrc}
            alt={`Preview for ${label}`}
            width={width}
            height={height}
            className=""
          />
        </div>
      )}
    </div>
  );
}
