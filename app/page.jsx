"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "@/lib/articles";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setData(articles);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="mt-[80px] tablet:mt-[120px] laptop:mt-[80px] px-[40px]">
      <div className="w-full flex gap-3 mb-[50px] tablet:mb-0">
        <div className="hidden tablet:block tablet:w-5/12"></div>
        <div className="w-ful tablet:w-6/12 text-[20px] tablet:text-[30px] leading-5 tablet:leading-9">
          Bethany Tran is a multidisciplinary designer based in Auckland, New
          Zealand. Driven by purposeful design, striving for functionality
          intertwined with emotional depth.
        </div>
      </div>

      {data.map((section, index) => (
        <div
          key={index}
          className="flex flex-col tablet:flex-row gap-0 tablet:gap-6 mt-0 tablet:mt-[70px]"
        >
          {[...Array(section.columns)].map((_, colIndex) => {
            const item = section.items.find(
              (itm) => itm.position === colIndex + 1
            );
            return (
              <div
                key={colIndex}
                className={`w-full tablet:w-${
                  section.columns === 2 ? "1/2" : "1/3"
                } ${colIndex > 0 ? "mt-4 tablet:mt-0" : ""}`}
              >
                {item ? (
                  <>
                    <Link href={`/${item.slug}`}>
                      <Image
                        src={item.cover}
                        alt={item.subtitle || "cover"}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </Link>
                    <div className="mt-[6px]">
                      <div className="flex justify-between text-[13px] tablet:text-[20px] font-semibold">
                        <p>{item.year}</p>
                        <p>{item.studio}</p>
                      </div>
                      <div className="flex justify-between text-[13px] tablet:text-[20px] font-semibold">
                        <p>{item.subtitle}</p>
                        <p>{item.subtitle}</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
