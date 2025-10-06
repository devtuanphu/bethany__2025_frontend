"use server";
import Image from "next/image";
import Link from "next/link";

const searchData = {
  populate: ["project", "project.groupMedia", "project.avatar"].toString(),
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
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const title = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_URL_BE}/api/title-home`
  );
  const projectRow = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_URL_BE}/api/row-projects?${searchParams}`
  );
  const projectData = projectRow?.data;
  let mergeProject = [];

  projectData.forEach((item) => {
    mergeProject = mergeProject.concat(item.attributes.project);
  });

  return (
    <div className="mt-[80px] tablet:mt-[120px] laptop:mt-[0px] px-[40px]">
      <div className="relative">
        <h1 className="text-[18vw]">hi, helloooo</h1>
        <div className="hidden desktop:block absolute right-[28%] top-[20%]">
          <Image src="/bethany-avatar.png" width={400} height={300} />
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-7">
          <h1 className=" text-[18px]  tablet:text-[30px] leading-5 tablet:leading-9">
            {" "}
            {title?.data?.attributes?.title}
          </h1>
        </div>
      </div>

      <div className="py-12">
        {mergeProject.map((item, key) => {
          let slug = item?.slug;

          return (
            <>
              <div key={key}>
                <div>
                  <h4 className="text-[30px]">
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
                <div className="grid grid-cols-4 gap-4 py-4">
                  {item?.groupMedia?.data?.map((item, key) => (
                    <div
                      className="mobile:col-span-4 desktop:col-span-1"
                      key={key}
                    >
                      <Link href={`/${slug}`} passHref>
                        <Image
                          src={baseUrl + item?.attributes?.url}
                          width={1000}
                          height={1000}
                          alt="Bethany"
                        />
                      </Link>
                    </div>
                  ))}
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
