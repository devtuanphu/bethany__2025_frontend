"use client";
import Image from "next/image";
import { useState } from "react";

const ProjectTitle = ({ title, studio, subTitle4 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="inline-block transition-opacity duration-300">
        <Image
          src={isHovered ? "/down-right-arrow-stroke_2.svg" : "/right-arrow-stroke_2.svg"}
          alt="arrow"
          width={21}
          height={24}
          className="inline-block transition-opacity duration-300 w-[14px] h-[16px] desktop:w-[21px] desktop:h-[24px]"
        />
      </span>
      <h4 className="text-[12px] desktop:text-[25px] flex items-center">
        {title || ""} /{" "}
        <span className="text-[#A0A0A0]">
          Studio: {studio || ""}
        </span>{" "}
        /{" "}
        <span className="text-[#A0A0A0]">
          {subTitle4 || ""}
        </span>
      </h4>
    </div>
  );
};

export default ProjectTitle;

