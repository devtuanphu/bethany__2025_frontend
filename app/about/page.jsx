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
    <div className=" bg-black text-white pt-[80px] tablet:pt-[120px] laptop:pt-[100px] px-[40px] pb-[40px] overflow-x-hidden">
      <div className="text-[30px] tablet:text-[38px] laptop:text-[44px] leading-[1] font-medium relative">
        <div>
          Hello! My name is{" "}
          <HoverLink
            label="Bethany Tran"
            mediaSrc={hoverData["Bethany Tran"]}
            width={550}
            height={550}
          />{" "}
          a designer specialising in{" "}
          <HoverLink
            label="graphic, motion, and digital design"
            mediaSrc={hoverData["graphic, motion, and digital design"]}
            width={550}
            height={550}
          />
          . I bring a versatile creative background experience bouncing around
          FMCG brands, in-house{" "}
          <HoverLink
            label="teams"
            mediaSrc={hoverData["teams"]}
            width={550}
            height={550}
          />{" "}
          , and agencies. I love making{" "}
          <HoverLink
            label="design"
            mediaSrc={hoverData["design"]}
            width={550}
            height={550}
          />{" "}
          that looks sharp, tells a story, and (hopefully) makes people feel
          something
        </div>
        <br />
        <div>
          I{" "}
          <HoverLink
            label="design"
            mediaSrc={hoverData["design2"]}
            width={550}
            height={550}
          />{" "}
          by day,{" "}
          <HoverLink
            label="hunt"
            mediaSrc={hoverData["hunt"]}
            width={550}
            height={550}
          />{" "}
          for the perfect phone wallpaper by night, and{" "}
          <HoverLink
            label="snack"
            mediaSrc={hoverData["snack"]}
            width={550}
            height={550}
          />{" "}
          in between.
        </div>
      </div>
    </div>
  );
}
