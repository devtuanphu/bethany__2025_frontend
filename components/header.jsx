"use client";

import Link from "next/link";
import React, { useState } from "react";
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import Navbar from "./Navbar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="text-white fixed top-0 left-0 right-0 flex flex-row justify-between flex-wrap min-h-[70px] px-[40px] items-center bg-black gap-[10px] z-50">
      <div className="text-[33px]">
        <Link href="/">Bethany Tran</Link>
      </div>

      <div className="text-[33px] hidden tablet:block">
        Work, <Link href="/about">Info</Link>, Contact
      </div>

      <div className="hidden tablet:block text-[33px]">
        Auckland 21:08:25 36°51'S/174°46'E
      </div>
      <div></div>

      <button
        onClick={toggleMenu}
        className="z-50 text-[30px] absolute top-0 right-0 bottom-0 p-4 tablet:p-8 transition-transform duration-300 hover:scale-110 active:scale-95 tablet:hidden"
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
