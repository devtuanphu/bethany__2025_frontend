"use server";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load AvatarHoverSection - không cần thiết ngay
const AvatarHoverSection = dynamic(() => import("@/components/avatarHoverSection"), {
  ssr: true,
});

// Lazy load VideoWrapper for client-side video handling
const VideoWrapper = dynamic(() => import("@/components/videoWrapper"), {
  ssr: false,
});

// Move outside component to avoid recreating on every render
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
export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  
  try {
    // Fetch API calls in parallel instead of sequentially
    const [title, projectRow] = await Promise.all([
      fetchWithToken(`${process.env.NEXT_PUBLIC_URL_BE}/api/title-home`),
      fetchWithToken(`${process.env.NEXT_PUBLIC_URL_BE}/api/row-projects?${searchParams}`),
    ]);
    
    // Handle timeout/network errors - if API returns null, show fallback
    if (!title && !projectRow) {
      throw new Error('All API requests failed');
    }
    
    const projectData = projectRow?.data || [];
    let mergeProject = [];

    if (projectData && Array.isArray(projectData)) {
      projectData.forEach((item) => {
        if (item?.attributes?.project) {
          mergeProject = mergeProject.concat(item.attributes.project);
        }
      });
    }

    return (
      <div className="mt-[80px] tablet:mt-[120px] laptop:mt-[0px] px-[40px]">
        <AvatarHoverSection />

        <div className="grid grid-cols-12">
          <div className="col-span-12 desktop:col-span-7 pt-[10px] desktop:pt-0">
            <h1 className="text-[22px] desktop:text-[30px]  tablet:text-[28px] leading-7 tablet:leading-9">
              {title?.data?.attributes?.title || "Welcome"}
            </h1>
          </div>
        </div>
        <div className="pt-10 pb-4">
          <h3 className="font-bold text-[#17FD5F] text-[16px] desktop:text-[30px]">
            *Selected Work
          </h3>
        </div>

        <div className="flex flex-col gap-10">
          {mergeProject.length > 0 ? (
            mergeProject.map((item, projectIndex) => {
              let slug = item?.slug;
              const isFirstProject = projectIndex === 0;

              return (
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
            })
          ) : (
            <div className="text-white">No projects available at the moment.</div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    // Only log unexpected errors (not timeout or network errors)
    const isExpectedError = 
      error.message?.includes('timeout') ||
      error.message?.includes('terminated') ||
      error.cause?.code === 'ETIMEDOUT' ||
      error.cause?.code === 'EHOSTUNREACH';
    
    if (!isExpectedError) {
      console.error("Error fetching data:", error);
    }
    
    // Return fallback UI instead of crashing
    return (
      <div className="mt-[80px] tablet:mt-[120px] laptop:mt-[0px] px-[40px]">
        <div className="text-white">
          <h1 className="text-[22px] desktop:text-[30px] tablet:text-[28px]">
            Welcome
          </h1>
          <p className="mt-4 text-red-400">
            Unable to load content. Please check your connection and try again later.
          </p>
        </div>
      </div>
    );
  }
}
