"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { articles } from "@/lib/articles";

export default function ArticlePage() {
  const params = useParams();
  const slug = params.id;

  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!slug) return;

    axios
      .get("/api/articles.json")
      .then((res) => {
        const found = res.data.find((item) => item.slug === slug);
        setArticle(found);
      })
      .catch(() => {
        let fallback = null;
        for (const group of articles) {
          const found = group.items.find((item) => item.slug === slug);
          if (found) {
            fallback = found;
            break;
          }
        }
        setArticle(fallback);
      });
  }, [slug]);

  if (!article)
    return <div className="text-white text-center mt-[140px]">Loading...</div>;

  return (
    <div className="bg-black text-white px-[40px] py-6 space-y-10 mt-[80px] tablet:mt-[120px] laptop:mt-[80px]">
      {article.data.map((item, idx) => {
        if (item.meta) {
          const meta = item.meta;
          return (
            <div
              key={idx}
              className="mx-auto space-y-4 flex flex-col laptop:flex-row gap-0 laptop:gap-6"
            >
              <div className="w-full laptop:w-1/2">
                <div className="text-[30px] tablet:text-[38px] laptop:text-[44px] text-bold">
                  {meta.title}
                </div>
                <ul className=" text-gray-300 space-y-1 w-full mt-6">
                  <li>
                    <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                      <div className="w-1/4 font-semibold leading-7">Year:</div>
                      <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                        {meta.year}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                      <div className="w-1/4 font-semibold leading-7">
                        Studio:
                      </div>
                      <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                        {meta.studio}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                      <div className="w-1/4 font-semibold leading-7">Role:</div>
                      <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                        {meta.role}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                      <div className="w-1/4 font-semibold leading-7">
                        Responsibilities:
                      </div>
                      <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                        {meta.responsibilities}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                      <div className="w-1/4 font-semibold leading-7">
                        Credits:
                      </div>
                      <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                        {meta.credits}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {meta.description && (
                <div className="text-lg leading-relaxed text-gray-100 w-full laptop:w-1/2">
                  {meta.description}
                </div>
              )}
            </div>
          );
        }

        if (item.src?.endsWith(".mp4")) {
          return (
            <video
              key={idx}
              controls
              autoPlay
              className="w-full mx-auto rounded-lg shadow-lg"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        }

        if (item.src?.match(/\.(jpg|jpeg|png|webp)$/)) {
          return (
            <img
              key={idx}
              src={item.src}
              alt=""
              className="w-full mx-auto rounded-lg shadow-lg"
            />
          );
        }

        return null;
      })}
    </div>
  );
}
