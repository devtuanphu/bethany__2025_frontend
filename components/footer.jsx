"use client";
import Link from "next/link";
import React, { memo } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  return (
    <div
      className={`px-[40px] ${isAboutPage ? "pt-[28px] pb-[28px]" : "py-[28px]"} min-h-[180px] grid grid-cols-4 ${
        isAboutPage
          ? "fixed bottom-0 left-0 right-0 bg-black z-40"
          : "mt-[20px]"
      }`}
      id="contact"
    >
      <div className="col-span-2 desktop:col-span-1 flex flex-col  tablet:w-auto pr-1 tablet:pr-0">
        <div className="text-[18px] tablet:text-[22px] font-semibold mb-1">
          CONTACT
        </div>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold truncate"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=BETHANYNAMTRAN%40GMAIL.COM"
        >
          BETHANYNAMTRAN@GMAIL.COM
        </Link>
        <div className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold">
          PHONE NUMBER
        </div>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold truncate"
          href="https://www.bethany.co.nz/tel:64211465868"
        >
          (+64) 211 465 868
        </Link>
      </div>
      <div className="col-span-2 desktop:col-span-1 flex flex-col  tablet:w-auto pl-1 tablet:pl-0">
        <span className="text-[18px] tablet:text-[22px] font-semibold mb-1  ml-auto desktop:ml-0">
          MORE INFO
        </span>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold  ml-auto desktop:ml-0"
          href="https://www.linkedin.com/in/bethany-tran-design/?fbclid=IwAR2gap8rJgP_rZNgPIACCRGh3fwaknkddtkItuoajsmtxG6Lh81EWMosfn4"
        >
          LINKEDIN
        </Link>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold  ml-auto desktop:ml-0"
          href="https://drive.google.com/file/d/1fy7mcaFyJHobvvhECcdISliACIMfMi0f/view"
        >
          RESUME
        </Link>
      </div>
      <div className="col-span-2 desktop:col-span-1 flex flex-col  tablet:w-auto pr-1 tablet:pr-0 pt-4 desktop:pt-0">
        <div className="text-[18px] tablet:text-[22px] font-semibold mb-1">
          LOCATION
        </div>
        <div className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold">
          TAMAKI MAKAURAU
        </div>
      </div>
      <div className="col-span-2 desktop:col-span-1 flex flex-col  tablet:w-auto pl-1 tablet:pl-0 pt-4 desktop:pt-0">
        <div className="text-[18px]  ml-auto tablet:text-[22px] font-semibold mb-1">
          BETHANY-TRAN
        </div>
        <div className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold ml-auto">
          © 2025 - 2026
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
