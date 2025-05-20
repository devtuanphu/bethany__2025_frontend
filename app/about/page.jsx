"use client";
import HoverLink from "@/components/hoverLink";
const hoverData = {
  "Bethany Tran": "/bethany-tran.png",
  "graphic, motion & digital design": "/digital-graphic.gif",
  "ZURU EDGE": "/zuruedgeteam.gif",
  designing: "/designing.png",
  animating: "/animating.png",
  eager: "/bethany-eager.png",
};

export default function AboutPage() {
  return (
    <div className=" bg-black text-white pt-[80px] tablet:pt-[120px] laptop:pt-[80px] px-[40px] pb-[40px] overflow-x-hidden">
      <div className="text-[30px] tablet:text-[38px] laptop:text-[44px] leading-[1] font-medium relative">
        <div>
          Hello! My name is{" "}
          <HoverLink
            label="Bethany Tran"
            mediaSrc={hoverData["Bethany Tran"]}
            width={200}
            height={234}
          />{" "}
          a creative designer from Aotearoa, New Zealand, specialising in{" "}
          <HoverLink
            label="graphic, motion & digital design"
            mediaSrc={hoverData["graphic, motion & digital design"]}
            width={260}
            height={180}
          />
          . I've been fortunate to kickstart my career as an in-house junior
          graphic designer at{" "}
          <HoverLink
            label="ZURU EDGE"
            mediaSrc={hoverData["ZURU EDGE"]}
            width={340}
            height={100}
          />{" "}
          from 2023 to 2024. During my time there, I've enjoyed diving into
          projects, from{" "}
          <HoverLink
            label="designing"
            mediaSrc={hoverData["designing"]}
            width={180}
            height={100}
          />{" "}
          digital media assets to{" "}
          <HoverLink
            label="animating"
            mediaSrc={hoverData["animating"]}
            width={80}
            height={80}
          />
          content and everything in between!
        </div>
        <div>
          As I look forward to the next chapter of my professional journey, I am{" "}
          <HoverLink
            label="eager"
            mediaSrc={hoverData["eager"]}
            width={200}
            height={216}
          />{" "}
          to continue applying my passion and expertise to create compelling
          visual experiences that leave a lasting impact.
        </div>
      </div>
    </div>
  );
}
