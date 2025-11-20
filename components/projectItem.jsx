"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

const VideoWrapper = dynamic(() => import("@/components/videoWrapper"), {
  ssr: false,
});

const ProjectTitle = ({ title, studio, subTitle4, isHovered }) => {
  return (
    <div className="flex items-center gap-2">
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
        <span className={`transition-colors duration-300 ${isHovered ? "text-[#17FD5F]" : ""}`}>
          {title || ""}
        </span>{" "}
        /{" "}
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

const ProjectItem = ({ item, baseUrl, isFirstProject }) => {
  const [isHovered, setIsHovered] = useState(false);
  const slug = item?.slug;

  return (
    <div
      className=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProjectTitle
        title={item.title || ""}
        studio={item.studio || ""}
        subTitle4={item.subTitle4 || ""}
        isHovered={isHovered}
      />
      <div className="grid grid-cols-6 gap-4 py-4">
        {item?.groupMediaHome?.data?.map((itemMedia, mediaIndex) => {
          // Only prioritize first 3 media items of first project (above the fold)
          const isAboveFold = isFirstProject && mediaIndex < 3;
          const isVideo =
            itemMedia?.attributes?.url?.endsWith(".mp4") ||
            itemMedia?.attributes?.url?.endsWith(".webm");

          return (
            <div
              className="mobile:col-span-6 desktop:col-span-1"
              key={mediaIndex}
            >
              {isVideo ? (
                <Link href={`/${slug}`} passHref prefetch={false}>
                  <VideoWrapper
                    src={baseUrl + itemMedia?.attributes?.url}
                    autoPlay={true}
                    className="w-full rounded-xl"
                    isAboveFold={isAboveFold}
                  />
                </Link>
              ) : (
                <Link href={`/${slug}`} passHref prefetch={false}>
                  <Image
                    src={baseUrl + itemMedia?.attributes?.url}
                    width={
                      itemMedia?.attributes?.formats?.medium?.width ||
                      700
                    }
                    height={
                      itemMedia?.attributes?.formats?.medium?.heght ||
                      100
                    }
                    alt="Bethany"
                    className="w-[100%] h-auto rounded-xl"
                    priority={isAboveFold}
                    loading={isAboveFold ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
                  />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectItem;

