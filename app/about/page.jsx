"use client";
import HoverLink from "@/components/hoverLink";
const hoverData = {
  "Bethany Tran": "/bethany-tran2.png",
  "graphic, motion, and digital design": "/graphic & motion & digital.gif",
  teams: "/teams.gif",
  design: "/design (lần 1).png",
  design2: "/design (lần 2).png",
  hunt: "/hunt.png",
  snack: "/snack.png",
};

export default function AboutPage() {
  return (
    <div className="bg-black text-white pt-[120px] laptop:pt-[100px] px-[20px] tablet:px-[40px] overflow-x-hidden overflow-y-auto min-h-[100vh]">
      <div className="text-[18px] tablet:text-[28px] laptop:text-[44px] leading-[1.2] tablet:leading-[1.1] laptop:leading-[1] font-medium relative">
        <div className="leading-[22px] tablet:leading-[32px] desktop:leading-[50px]">
          Hello! My name is{" "}
          <HoverLink
            label="Bethany Tran"
            mediaSrc={hoverData["Bethany Tran"]}
            width={300}
            height={300}
            tabletWidth={400}
            tabletHeight={400}
            desktopWidth={450}
            desktopHeight={450}
          />{" "}
          a designer specialising in{" "}
          <HoverLink
            label="graphic, motion, and digital design"
            mediaSrc={hoverData["graphic, motion, and digital design"]}
            width={300}
            height={300}
            tabletWidth={400}
            tabletHeight={400}
            desktopWidth={450}
            desktopHeight={450}
          />
          . I bring a versatile creative background experience bouncing around
          FMCG brands, in-house{" "}
          <HoverLink
            label="teams"
            mediaSrc={hoverData["teams"]}
            width={300}
            height={300}
            tabletWidth={400}
            tabletHeight={400}
            desktopWidth={450}
            desktopHeight={450}
          />{" "}
          , and agencies. I love making{" "}
          <HoverLink
            label="design"
            mediaSrc={hoverData["design"]}
            width={300}
            height={300}
            tabletWidth={400}
            tabletHeight={400}
            desktopWidth={450}
            desktopHeight={450}
          />{" "}
          that looks sharp, tells a story, and (hopefully) makes people feel
          something
        </div>
        <br />
        <div className="leading-[22px] tablet:leading-[32px] desktop:leading-[50px]">
          I{" "}
          <HoverLink
            label="design"
            mediaSrc={hoverData["design2"]}
            width={300}
            height={300}
            tabletWidth={400}
            tabletHeight={400}
            desktopWidth={450}
            desktopHeight={450}
          />{" "}
          by day,{" "}
          <HoverLink
            label="hunt"
            mediaSrc={hoverData["hunt"]}
            width={300}
            height={300}
            tabletWidth={400}
            tabletHeight={400}
            desktopWidth={450}
            desktopHeight={450}
          />{" "}
          for the perfect phone wallpaper by night, and{" "}
          <HoverLink
            label="snack"
            mediaSrc={hoverData["snack"]}
            width={300}
            height={300}
            tabletWidth={400}
            tabletHeight={400}
            desktopWidth={450}
            desktopHeight={450}
          />{" "}
          in between.
        </div>
      </div>
    </div>
  );
}
