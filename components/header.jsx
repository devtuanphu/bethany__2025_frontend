"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import Navbar from "./navbar";
import Image from "next/image";

// Helper function to get Auckland time - optimized
// Cache the formatter to avoid recreating it every time
let cachedFormatter = null;
const getAucklandTime = () => {
  const now = new Date();
  
  // Cache the formatter for better performance
  if (!cachedFormatter) {
    cachedFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Pacific/Auckland",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  
  return cachedFormatter.format(now);
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Start with placeholder to avoid hydration mismatch
  // Server and client must render the same initial value
  const [aucklandTime, setAucklandTime] = useState("--:--:--");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    // Update immediately on mount (client-side only)
    setAucklandTime(getAucklandTime());
    
    const updateClock = () => {
      setAucklandTime(getAucklandTime());
    };

    // Update every second
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white fixed top-0 left-0 right-0 min-h-[70px] px-[40px] items-center bg-black z-50 grid grid-cols-4 border-b border-[#757272] py-1">
      <div className="col-span-2 desktop:col-span-1 text-[29px]">
        <Link href="/">Bethany Tran</Link>
      </div>
      <div className="text-[29px] hidden tablet:block">
        <Link href="/">Work</Link>, <Link href="/about">Info</Link>{" "}
      </div>
      <div className="hidden tablet:block text-[29px]">
        <div className="flex gap-4">
          <span>Auckland</span>
          <span className=" text-[29px] ">36°51'S/174°46'E</span>
        </div>
      </div>

      <div className="hidden tablet:flex justify-end text-[31px] ">
        <span suppressHydrationWarning>{aucklandTime}</span>
      </div>

      <div className="flex justify-end col-span-2 desktop:col-span-1 ">
        <button
          onClick={toggleMenu}
          className="z-50 text-[30px]   tablet:p-8 transition-transform duration-300 active:scale-95 tablet:hidden col-span-2 desktop:col-span-1"
          aria-label="Toggle Menu"
        >
          <div className="transition-opacity duration-300">
            {isMenuOpen ? (
              <VscChromeClose className="animate-fade-in" />
            ) : (
              <VscMenu className="animate-fade-in" />
            )}
          </div>
        </button>
      </div>

      <Navbar isOpen={isMenuOpen} />
    </div>
  );
};

export default Header;
