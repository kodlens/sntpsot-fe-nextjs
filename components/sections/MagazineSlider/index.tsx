import SwipeMagazine from "@/components/SwipeMagazine";
import { Magazine } from "@/types/magazine";
import Link from "next/link";

export default async function MagazineSlider() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/magazines/load-magazines`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error("Error mounting magazine slider.");
  }

  const data: Magazine[] = await res.json();
  if (!data?.length) return null;

  const years = data.map((item) => item.year).filter((year): year is number => typeof year === "number");
  const minYear = years.length ? Math.min(...years) : null;
  const maxYear = years.length ? Math.max(...years) : null;
  const yearRange = minYear && maxYear ? (minYear === maxYear ? `${minYear}` : `${minYear} - ${maxYear}`) : "Magazine Archive";

  return (
    <section className="relative overflow-hidden bg-[#eef8ff] py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(34,170,226,.16),transparent_38%),radial-gradient(circle_at_85%_78%,rgba(251,176,64,.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/hex-pattern.svg')] bg-center opacity-[0.03]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0b6f9b]">Magazine Archive</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">S&T Post Archives</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
              Explore past issues of our Science & Technology magazines and revisit key innovations, programs, and discoveries.
            </p>
          </div>

          <div className="inline-flex w-fit rounded-full border border-[#fbb040]/50 bg-[#fbb040]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8c5603]">
            {yearRange}
          </div>
        </div>

        <div className="rounded-3xl border border-[#22aae2]/20 bg-white/65 p-4 shadow-xl shadow-[#22aae2]/10 backdrop-blur-sm md:p-6">
          <SwipeMagazine data={data} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="https://www.stii.dost.gov.ph/projects/s-t-publications/2015-10-28-06-07-25"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#22aae2]/45 bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-[#0b6f9b] transition-colors hover:border-[#fbb040]/60 hover:text-[#8c5603]"
          >
            See More
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
