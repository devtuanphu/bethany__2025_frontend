"use server";
import Image from "next/image";
import Link from "next/link";
import AvatarHoverSection from "@/components/avatarHoverSection";

const searchData = {
  populate: [
    "project",
    "project.groupMedia",
    "project.avatar",
    "project.groupMediaHome",
  ].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

async function fetchWithToken(endpoint) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // Cache for 60 seconds - revalidate every minute
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  
  // Fetch API calls in parallel instead of sequentially
  const [title, projectRow] = await Promise.all([
    fetchWithToken(`${process.env.NEXT_PUBLIC_URL_BE}/api/title-home`),
    fetchWithToken(`${process.env.NEXT_PUBLIC_URL_BE}/api/row-projects?${searchParams}`),
  ]);
  
  const projectData = projectRow?.data;
  let mergeProject = [];

  projectData.forEach((item) => {
    mergeProject = mergeProject.concat(item.attributes.project);
  });

  return (
    <div className="mt-[80px] tablet:mt-[120px] laptop:mt-[0px] px-[40px]">
      <AvatarHoverSection />

      <div className="grid grid-cols-12">
        <div className="col-span-12 desktop:col-span-7 pt-[10px] desktop:pt-0">
          <h1 className="text-[22px] desktop:text-[30px]  tablet:text-[28px] leading-7 tablet:leading-9">
            {title?.data?.attributes?.title}
          </h1>
        </div>
      </div>
      <div className="pt-10 pb-4">
        <h3 className="font-bold text-[#17FD5F] text-[16px] desktop:text-[30px]">
          *Selected Work
        </h3>
      </div>

      <div className="flex flex-col gap-10">
        {mergeProject.map((item, projectIndex) => {
          let slug = item?.slug;
          const isFirstProject = projectIndex === 0;

          return (
            <>
              <div key={projectIndex} className="">
                <div>
                  <h4 className="text-[12px] desktop:text-[25px]">
                    {item.title || ""} /{" "}
                    <span className="text-[#A0A0A0]">
                      Studio: {item.studio || ""}
                    </span>{" "}
                    /{" "}
                    <span className="text-[#A0A0A0]">
                      {item.subTitle4 || ""}
                    </span>
                  </h4>
                </div>
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
                          <Link href={`/${slug}`} passHref prefetch>
                            <video
                              src={baseUrl + itemMedia?.attributes?.url}
                              controls={false}
                              autoPlay={true}
                              playsInline
                              preload={isAboveFold ? "auto" : "metadata"}
                              className="w-full rounded-xl"
                              muted
                              loop
                            />
                          </Link>
                        ) : (
                          <Link href={`/${slug}`} passHref prefetch>
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
            </>
          );
        })}
      </div>

      {/* {projectData.map((section, index) => (
        <div
          key={index}
          className="flex flex-col tablet:flex-row gap-0 tablet:gap-6 mt-0 tablet:mt-[70px]"
        >
          {[...Array(section.attributes.columns)].map((_, colIndex) => {
            const item = section.attributes.project.find(
              (itm) => itm.position === colIndex + 1
            );
            if (!item)
              return (
                <div
                  key={colIndex}
                  className={`w-full tablet:w-${
                    section.attributes.columns === 2 ? "1/2" : "1/3"
                  } ${colIndex > 0 ? "mt-4 tablet:mt-0" : ""}`}
                ></div>
              );

            // Lấy ảnh đúng url, ưu tiên formats.large hoặc fallback url gốc
            const coverUrl =
              baseUrl + item.avatar?.data?.attributes?.formats?.large?.url ||
              baseUrl + item.avatar?.data?.attributes?.url ||
              "";

            return (
              <div
                key={colIndex}
                className={`w-full tablet:w-${
                  section.attributes.columns === 2 ? "1/2" : "1/3"
                } ${colIndex > 0 ? "mt-4 tablet:mt-0" : ""} ${
                  item.isHeightSpecial
                    ? "tablet:relative tablet:z-10 tablet:h-[600px] tablet:-mb-[300px]"
                    : "h-auto"
                }`}
              >
                <Link href={`/${item.slug}`}>
                  <Image
                    src={coverUrl}
                    alt={item.subTitle3 || "cover"}
                    width={500}
                    height={300}
                    className={`w-full object-cover rounded-xl ${
                      item.isHeightSpecial ? "h-full" : "h-auto"
                    }`}
                  />
                </Link>
                <div className="mt-[6px]">
                  <div className="flex leading-5  justify-between text-[13px] tablet:text-[20px] font-semibold">
                    <p>{item.subTitle1 || item.year}</p>
                    <p>{item.subTitle2 || item.studio}</p>
                  </div>
                  <div className="flex leading-5 justify-between text-[13px] tablet:text-[20px] font-semibold">
                    <p>{item.subTitle3}</p>
                    <p>{item.subTitle4}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))} */}
    </div>
  );
}
