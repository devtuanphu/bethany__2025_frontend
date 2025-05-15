import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between px-[40px] py-[28px] mt-[20px] min-h-[180px]">
      <div className="flex flex-col">
        <div className="text-[22px] font-semibold mb-1">CONTACT</div>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=BETHANYNAMTRAN%40GMAIL.COM"
        >
          BETHANYNAMTRAN@GMAIL.COM
        </Link>
        <div className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold">
          PHONE NUMBER
        </div>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold"
          href="https://www.bethany.co.nz/tel:64211465868"
        >
          (+64) 211 465 868
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="text-[22px] font-semibold mb-1">MORE INFO</div>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold"
          href="https://www.linkedin.com/in/bethany-tran-design/?fbclid=IwAR2gap8rJgP_rZNgPIACCRGh3fwaknkddtkItuoajsmtxG6Lh81EWMosfn4"
        >
          LINKEDIN
        </Link>
        <Link
          className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold"
          href="https://drive.google.com/file/d/1fy7mcaFyJHobvvhECcdISliACIMfMi0f/view"
        >
          RESUME
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="text-[22px] font-semibold mb-1">LOCATION</div>
        <div className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold">
          TAMAKI MAKAURAU
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-[22px] font-semibold mb-1">BETHANY-TRAN</div>
        <div className="text-[12px] tablet:text-[14px] laptop:text-[17px] font-semibold ml-auto">
          © 2024 - 2025
        </div>
      </div>
    </div>
  );
};

export default Footer;
