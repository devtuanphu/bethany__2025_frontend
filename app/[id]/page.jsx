"use server";
import Image from "next/image";
import React from "react";

async function fetchWithToken(endpoint) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
  
  // Add timeout to prevent hanging requests
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // Cache for 5 minutes - revalidate every 5 minutes to reduce server load
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Return null for 404 (not found) instead of throwing error
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle timeout and network errors gracefully
    if (error.name === 'AbortError' || 
        error.cause?.code === 'ETIMEDOUT' || 
        error.cause?.code === 'EHOSTUNREACH' ||
        error.message?.includes('timeout') ||
        error.message?.includes('terminated')) {
      // Return null for timeout/network errors instead of throwing
      // This prevents excessive error logging
      return null;
    }
    
    // Only throw for other errors
    throw error;
  }
}

const page = async ({ params }) => {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  try {
    const detailProject = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_URL_BE}/api/row-project/project/${id}`
    );

    // Handle 404 - project not found
    if (!detailProject) {
      return (
        <div className="bg-black text-white px-[40px] py-6 mt-[80px] tablet:mt-[120px] laptop:mt-[80px]">
          <h1 className="text-2xl mb-4">Project Not Found</h1>
          <p className="text-red-400">
            The project you're looking for doesn't exist or has been removed.
          </p>
        </div>
      );
    }

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
              playsInline
              preload="auto"
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
              priority
            />
          )
        ) : (
          <div>No media available</div>
        )}

        <div className="mx-auto space-y-4 flex flex-col laptop:flex-row gap-0 laptop:gap-6">
          <div className="w-full laptop:w-1/2">
            <div className="text-[44px] text-bold">
              <h2> {detailProject.title}</h2>
            </div>
            <ul className="space-y-6 desktop:space-y-1 w-full mt-6">
              <li>
                <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-4 text-lg">
                  <div className="w-1/4 font-semibold leading-6 text-[22px] desktop:text-base">
                    Year:
                  </div>
                  <div className="w-3/4 leading-6 text-base tablet:text-base">
                    <h3>{detailProject.year}</h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-4 text-lg">
                  <div className="w-1/4 font-semibold leading-6 text-[22px] desktop:text-base">
                    Studio:
                  </div>
                  <div className="w-3/4 leading-6 text-base tablet:text-lg">
                    {detailProject.studio}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-4 text-lg">
                  <div className="w-1/4 font-semibold leading-6 text-[22px] desktop:text-base">
                    Role:
                  </div>
                  <div className="w-3/4 leading-6 text-base tablet:text-lg">
                    {detailProject.role}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-4 text-lg">
                  <div className="w-1/4 font-semibold leading-6 text-[22px] desktop:text-base">
                    Responsibilities:
                  </div>
                  <div className="w-3/4 leading-6 text-base tablet:text-lg">
                    {detailProject.responsibilities}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-4 text-lg">
                  <div className="w-1/4 font-semibold leading-6 text-[22px] desktop:text-base">
                    Credits:
                  </div>
                  <div className="w-3/4 leading-6 text-base tablet:text-lg">
                    {detailProject.credits}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {detailProject.description && (
            <div className="text-base desktop:text-lg  text-gray-100 w-full laptop:w-1/2 pt-2">
              {detailProject.description}
            </div>
          )}
        </div>

        {/* <div className="grid grid-cols-1 gap-4">
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
        </div> */}

        {groupMedia &&
          groupMedia.slice(1).map((item, key) => {
            return (
              <div key={key}>
                {item?.mime?.startsWith("video") ? (
                  <video
                    src={process.env.NEXT_PUBLIC_URL_BE + item.url}
                    controls
                    autoPlay={false}
                    playsInline
                    preload="none"
                    className="w-full rounded-xl"
                    muted
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={process.env.NEXT_PUBLIC_URL_BE + item.url}
                    alt={item.alternativeText || "media"}
                    width={item.width}
                    height={item.height}
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                )}
              </div>
            );
          })}
      </div>
    </>
    );
  } catch (error) {
    // Only log unexpected errors (not timeout, network, or 404 errors)
    const isExpectedError = 
      error.message?.includes('404') ||
      error.message?.includes('timeout') ||
      error.message?.includes('terminated') ||
      error.cause?.code === 'ETIMEDOUT' ||
      error.cause?.code === 'EHOSTUNREACH';
    
    if (!isExpectedError) {
      console.error("Error fetching project:", error);
    }
    
    return (
      <div className="bg-black text-white px-[40px] py-6 mt-[80px] tablet:mt-[120px] laptop:mt-[80px]">
        <h1 className="text-2xl mb-4">Unable to Load Project</h1>
        <p className="text-red-400">
          The server is not responding. Please check your connection and try again later.
        </p>
      </div>
    );
  }
};

export default page;
