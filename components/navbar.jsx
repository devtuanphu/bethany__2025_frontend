"use client";

import Link from "next/link";
import React from "react";

const Navbar = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center transition-transform duration-500 ease-in-out ${
        isOpen
          ? "translate-x-0 translate-y-0"
          : "-translate-x-full -translate-y-full"
      }`}
    >
      <div className="flex flex-col items-center gap-20 text-white text-4xl">
        <Link href="#project">Work</Link>
        <Link href="/about">Info</Link>
        <Link href="#contact">Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;
