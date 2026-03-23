import { Magazine } from "@/types/magazine";
import Image from "next/image";
import Link from "next/link";


const getBanner = async (): Promise<Magazine | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/magazines/load-featured-magazine`, {
      next: { revalidate: 60 },
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return (data ?? null) as Magazine | null;
  } catch (error) {
    console.error("Failed to load banner", error);
    return null;
  }
};

const MainBanner = async () => {
  const banner = await getBanner();
  const imageUrl = banner?.cover
    ? `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/magazines/${banner.cover}`
    : undefined;

  console.log('image url', imageUrl);
  
  return (
    <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
      style={{
        background: `url('/images/hero-bg.jpg') center/cover no-repeat`,
      }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#22aae2]/35 blur-3xl" />
        <div className="absolute top-[35%] left-[42%] h-64 w-64 rounded-full bg-[#22aae2]/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#fbb040]/25 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(6,26,44,.95)_0%,rgba(10,43,66,.8)_45%,rgba(34,170,226,.25)_100%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 px-6 py-16 text-white lg:flex-row lg:justify-between lg:gap-14 lg:px-8 lg:py-20">
        <div className="w-full lg:max-w-[640px]">
          <p className="mb-4 inline-block rounded-full border border-[#22aae2]/55 bg-[#22aae2]/15 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-[#bde9fa]">
            S&amp;T Post
          </p>
          <h1 className="text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-7xl">
            Don&apos;t miss out on the best S&amp;T stories from around the country
          </h1>
          <p className="mt-6 max-w-[58ch] text-sm text-white/85 sm:text-base">
            Fresh science and technology stories, discoveries, and innovation highlights delivered in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#featured-stories"
              className="rounded-full bg-[#fbb040] px-7 py-3 text-sm font-bold text-[#08273f] transition hover:bg-[#ffc56f]"
            >
              Explore Stories
            </a>
            <a
              href="#latest-stories"
              className="rounded-full border border-[#22aae2]/60 bg-[#22aae2]/10 px-7 py-3 text-sm font-bold text-[#d8f3ff] transition hover:bg-[#22aae2]/20"
            >
              Read Latest
            </a>
          </div>
        </div>

        <div className="relative w-full max-w-[360px] shrink-0 sm:max-w-[430px] lg:max-w-[470px]">
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border border-[#22aae2]/35 bg-[#22aae2]/10" />
          <div className="relative overflow-hidden rounded-2xl border border-[#22aae2]/45 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
            <a href='#featured-magazine'>
              {imageUrl ? (
                <Image
                  src={imageUrl || "/images/placeholder-magazine.png"}
                  alt="S&T magazine cover"
                  loading="lazy"
                  width={500}
                  height={500}
                  className="h-[460px] w-full rounded-xl object-cover sm:h-[520px]"
                />
              ) : (
                <div className="flex h-[460px] w-full items-center justify-center rounded-xl bg-black/25 text-sm text-white/80 sm:h-[520px]">
                  Magazine cover
                </div>
              )}


            </a>
          </div>
          <div className="absolute -right-6 -bottom-6 rounded-xl border border-[#fbb040]/60 bg-[#fbb040]/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#08273f]">
            Latest Issue
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
