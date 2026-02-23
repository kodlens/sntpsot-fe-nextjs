import Image from "next/image";
import Link from "next/link";
import SliderDostv from "@/components/SliderDostv";

const DostV = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/dostv/load-dostv`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error("Failed to load DOSTv content.");
  }

  const data = await res.json();

  const featuredImage = data?.dostv?.featured_image as string | undefined;
  const normalizedImage = featuredImage ? featuredImage.replace(/^\/+/, "") : "";
  const bannerImage = normalizedImage
    ? normalizedImage.startsWith("http")
      ? normalizedImage
      : `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/dostv/banners/${normalizedImage}`
    : "/images/placeholder-magazine.png";
  
  const websiteUrl = data?.dostv?.website || "#";
  const youtubeUrl = data?.dostv?.link || "#";

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#021024_0%,#05203b_45%,#06345a_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(34,170,226,.22),transparent_35%),radial-gradient(circle_at_88%_80%,rgba(251,176,64,.16),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8cdfff]">Video Feature</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-5xl">
            DOST<span className="text-[#22aae2]">v</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-sm">
          <div className="relative">
            <div className="relative aspect-[16/8] min-h-[280px] w-full md:min-h-[360px]">
              <Image
                src={bannerImage}
                alt={data?.dostv?.title ?? "DOSTv banner"}
                fill
               
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#021024]/90 via-[#021024]/55 to-[#021024]/20" />
            </div>

            <div className="absolute inset-0 flex items-end p-5 md:p-8">
              <div className="max-w-3xl">
                <p className="inline-flex rounded-full border border-[#22aae2]/45 bg-[#22aae2]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9f3ff]">
                  {data?.dostv?.title || "DOSTv"}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">{data?.dostv?.description}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    prefetch={false}
                    target="_blank"
                    rel="noreferrer"
                    href={websiteUrl}
                    className="inline-flex items-center rounded-full bg-[#22aae2] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#0f8fc4]"
                  >
                    Learn More
                  </Link>
                  <Link
                    prefetch={false}
                    target="_blank"
                    rel="noreferrer"
                    href={youtubeUrl}
                    className="inline-flex items-center rounded-full border border-[#fbb040]/70 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#ffd79b] transition-colors hover:bg-[#fbb040]/20"
                  >
                    Visit YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 pb-10 pt-5 md:px-6">
            <div className="mb-4 inline-flex rounded-full border border-[#22aae2]/45 bg-[#22aae2]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9f3ff]">
              Latest Videos
            </div>
            <SliderDostv data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DostV;
