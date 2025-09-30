"use server";
import Image from "next/image";
import React from "react";

async function fetchWithToken(endpoint) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // Đảm bảo không cache dữ liệu
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

const page = async ({ params }) => {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  const detailProject = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_URL_BE}/api/row-project/project/${id}`
  );

  const groupMedia = detailProject?.groupMedia;
  const firstMedia = groupMedia && groupMedia.length > 0 ? groupMedia[0] : null;
  const heightMedia = firstMedia?.height;
  const widthMedia = firstMedia?.width;
  const isVideo =
    firstMedia?.mime?.startsWith("video") || firstMedia?.url?.endsWith(".mp4");
  const getOptimizedImageUrl = (media) => {
    if (media.formats?.large)
      return process.env.NEXT_PUBLIC_URL_BE + media.formats.large.url;
    if (media.formats?.medium)
      return process.env.NEXT_PUBLIC_URL_BE + media.formats.medium.url;
    if (media.formats?.small)
      return process.env.NEXT_PUBLIC_URL_BE + media.formats.small.url;
    return process.env.NEXT_PUBLIC_URL_BE + media.url; // fallback ảnh gốc
  };
  return (
    <>
      <div className="bg-black text-white px-[40px] py-6 space-y-10 mt-[80px] tablet:mt-[120px] laptop:mt-[80px]">
        {firstMedia ? (
          isVideo ? (
            <video
              src={process.env.NEXT_PUBLIC_URL_BE + firstMedia.url}
              controls
              autoPlay={true}
              className="w-full rounded-xl"
              muted
            />
          ) : (
            <Image
              src={process.env.NEXT_PUBLIC_URL_BE + firstMedia.url}
              alt={firstMedia.alternativeText || "media"}
              width={widthMedia} // lấy đúng width gốc
              height={heightMedia} // lấy đúng height gốc
              className="w-full h-auto rounded-xl"
            />
          )
        ) : (
          <div>No media available</div>
        )}

        <div className="mx-auto space-y-4 flex flex-col laptop:flex-row gap-0 laptop:gap-6">
          <div className="w-full laptop:w-1/2">
            <div className="text-[30px] tablet:text-[30px] laptop:text-[44px] text-bold">
              <h2> {detailProject.title}</h2>
            </div>
            <ul className=" text-gray-300 space-y-1 w-full mt-6">
              <li>
                <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                  <div className="w-1/4 font-semibold leading-7">Year:</div>
                  <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                    <h3>{detailProject.year}</h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                  <div className="w-1/4 font-semibold leading-7">Studio:</div>
                  <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                    {detailProject.studio}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                  <div className="w-1/4 font-semibold leading-7">Role:</div>
                  <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                    {detailProject.role}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                  <div className="w-1/4 font-semibold leading-7">
                    Responsibilities:
                  </div>
                  <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                    {detailProject.responsibilities}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-0 tablet:gap-4 text-[20px]">
                  <div className="w-1/4 font-semibold leading-7">Credits:</div>
                  <div className="w-3/4 leading-7 text-base tablet:text-[20px]">
                    {detailProject.credits}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {detailProject.description && (
            <div className="text-lg leading-relaxed text-gray-100 w-full laptop:w-1/2">
              {detailProject.description}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {groupMedia.slice(1).map((media, index) => {
            const isVideo =
              media.mime?.startsWith("video") || media.url?.endsWith(".mp4");

            if (isVideo) {
              return (
                <video
                  key={media.id || index}
                  src={process.env.NEXT_PUBLIC_URL_BE + media.url}
                  controls
                  autoPlay={true}
                  className="w-full rounded-xl"
                  muted
                />
              );
            } else {
              return (
                <Image
                  key={media.id || index}
                  src={getOptimizedImageUrl(media)}
                  alt={media.alternativeText || "media"}
                  width={media.width}
                  height={media.height}
                  className="w-full h-auto rounded-xl"
                  priority={index === 0}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default page;
