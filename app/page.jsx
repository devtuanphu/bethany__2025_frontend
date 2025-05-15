import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-[120px] laptop:mt-[80px] px-[40px]">
      <div className="w-full flex gap-3">
        <div className="w-5/12"></div>
        <div className="w-6/12 text-[20px] tablet:text-[30px] leading-5 tablet:leading-9">
          Bethany Tran is a multidisciplinary designer based in Auckland, New
          Zealand. Driven by purposeful design, striving for functionality
          intertwined with emotional depth.
        </div>
      </div>
      <div>
        <div className="flex flex-col tablet:flex-row mt-[70px] gap-6">
          <div className="w-full tablet:w-1/2">
            <Link href="/aaa">
              <Image
                src="https://res.cloudinary.com/dj1vhqp5w/image/upload/v1728297216/fycrg6dtqqkx5n1sdiup.png"
                alt="image alt"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
              />
            </Link>
            <div className="mt-[6px]">
              <div className="flex justify-between text-[20px] font-semibold">
                <p>2024</p>
                <p>STUDIO: ZURU EDGE</p>
              </div>
              <div className="flex justify-between text-[20px] font-semibold">
                <p>HABIT</p>
                <p>HABIT</p>
              </div>
            </div>
          </div>
          <div className="w-full tablet:w-1/2"></div>
        </div>
        <div className="flex flex-col tablet:flex-row mt-[70px] gap-6">
          <div className="w-ful tablet:w-1/3"></div>
          <div className="w-ful tablet:w-1/3">
            <Link href="/bbb">
              <Image
                src="https://res.cloudinary.com/dj1vhqp5w/image/upload/v1746439003/hxulxlrgwav2zjvr7cg6.webp"
                alt="image alt"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
              />
            </Link>
            <div className="mt-[6px]">
              <div className="flex justify-between text-[20px] font-semibold">
                <p>2024</p>
                <p>STUDIO: ZURU EDGE</p>
              </div>
              <div className="flex justify-between text-[20px] font-semibold">
                <p>HABIT</p>
                <p>HABIT</p>
              </div>
            </div>
          </div>
          <div className="w-ful tablet:w-1/3">
            <Link href="/ccc">
              <Image
                src="https://res.cloudinary.com/dj1vhqp5w/image/upload/v1746439123/xs6umkmtxpekqu64wzt2.jpg"
                alt="image alt"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
              />
            </Link>
            <div className="mt-[6px]">
              <div className="flex justify-between text-[20px] font-semibold">
                <p>2024</p>
                <p>STUDIO: ZURU EDGE</p>
              </div>
              <div className="flex justify-between text-[20px] font-semibold">
                <p>HABIT</p>
                <p>HABIT</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col tablet:flex-row mt-[70px] gap-6">
          <div className="w-full tablet:w-1/2">
            <Link href="/ddd">
              <Image
                src="https://res.cloudinary.com/dj1vhqp5w/image/upload/v1728297344/cuuvgztetm4ds1yg2owb.png"
                alt="image alt"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
              />
            </Link>
            <div className="mt-[6px]">
              <div className="flex justify-between text-[20px] font-semibold">
                <p>2024</p>
                <p>STUDIO: ZURU EDGE</p>
              </div>
              <div className="flex justify-between text-[20px] font-semibold">
                <p>HABIT</p>
                <p>HABIT</p>
              </div>
            </div>
          </div>
          <div className="w-full tablet:w-1/2">
            <Link href="/eee">
              <Image
                src="https://res.cloudinary.com/dj1vhqp5w/image/upload/v1728124882/ffexufbuue77o8pquhjj.png"
                alt="image alt"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
              />
            </Link>
            <div className="mt-[6px]">
              <div className="flex justify-between text-[20px] font-semibold">
                <p>2024</p>
                <p>STUDIO: ZURU EDGE</p>
              </div>
              <div className="flex justify-between text-[20px] font-semibold">
                <p>HABIT</p>
                <p>HABIT</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col tablet:flex-row mt-[70px] gap-6">
          <div className="w-full tablet:w-1/2"></div>
          <div className="w-full tablet:w-1/2">
            <Link href="/ggg">
              <Image
                src="https://res.cloudinary.com/dj1vhqp5w/image/upload/v1728124987/pxankkhp6cvzwl0w8p0s.png"
                alt="image alt"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
              />
            </Link>
            <div className="mt-[6px]">
              <div className="flex justify-between text-[20px] font-semibold">
                <p>2024</p>
                <p>STUDIO: ZURU EDGE</p>
              </div>
              <div className="flex justify-between text-[20px] font-semibold">
                <p>HABIT</p>
                <p>HABIT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
