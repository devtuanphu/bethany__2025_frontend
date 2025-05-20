"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import Navbar from "./navbar";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aucklandTime, setAucklandTime] = useState("");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Pacific/Auckland",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = now.toLocaleTimeString("en-GB", options);
      setAucklandTime(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white fixed top-0 left-0 right-0 flex flex-row justify-between flex-wrap min-h-[70px] px-[40px] items-center bg-black gap-[10px] z-50">
      <div className="text-[33px]">
        <Link href="/">Bethany Tran</Link>
      </div>

      <div className="text-[33px] hidden tablet:block">
        <Link href="/">Work</Link>, <Link href="/about">Info</Link>,{" "}
        <Link href="#contact">Contact</Link>
      </div>

      <div className="hidden tablet:block text-[33px]">
        Auckland {aucklandTime} 36°51'S/174°46'E
      </div>

      <div></div>

      <button
        onClick={toggleMenu}
        className="z-50 text-[30px] absolute top-0 right-0 bottom-0 p-4 tablet:p-8 transition-transform duration-300 active:scale-95 tablet:hidden"
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

      <Navbar isOpen={isMenuOpen} />
    </div>
  );
};

export default Header;
