import Link from "next/link";

const truncate = (text: string, limit: number) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : text;
};

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default async function FeaturedMagazine() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/magazines/load-featured-magazine`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) throw new Error("Failed to load featured magazine.");

  const data = await res.json();

  const coverImage = `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/magazines/${data?.cover}`;
  const coverText = truncate(stripHtml(`${data?.excerpt || ""}`), 60);
  const issueLabel =
    data?.quarter && data?.year ? `Quarter ${data.quarter}, ${data.year}` : data?.year ? `${data.year}` : "Latest Issue";

  return (
    <section className="relative overflow-hidden bg-[#041225] py-16 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(34,170,226,.20),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(251,176,64,.15),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(4,18,37,.96)_0%,rgba(4,18,37,.75)_45%,rgba(34,170,226,.12)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#22aae2]">Featured Magazine</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
              Dive Into The Latest S&T Magazine Edition
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg">
              Explore innovations, discoveries, and stories from across the DOST community in this featured release.
            </p>
          </div>

          <div className="inline-flex w-fit rounded-full border border-[#fbb040]/55 bg-[#fbb040]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#ffdba2]">
            {issueLabel}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm md:p-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link
              prefetch={false}
              href={`/magazines/flipbook/${data?.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/15"
            >
              <div className="aspect-[4/5] w-full bg-slate-700 bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041225]/85 via-[#041225]/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-flex rounded-full border border-[#22aae2]/40 bg-[#22aae2]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bfeeff]">
                  Cover Story
                </span>
                <p className="mt-3 text-sm font-semibold text-white/90">Open Flipbook</p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
              About The Cover
            </p>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight text-white md:text-4xl">{data?.title}</h3>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 md:text-lg">{coverText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/magazines/flipbook/${data?.slug}`}
                prefetch={false}
                className="inline-flex items-center rounded-full bg-[#22aae2] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#0f8fc4]"
              >
                Read Magazine
              </Link>
              <Link
                href="/archives"
                prefetch={false}
                className="inline-flex items-center rounded-full border border-[#fbb040]/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#ffdba2] transition-colors hover:bg-[#fbb040]/20"
              >
                View Archives
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
