import Link from "next/link";
import SwipeMagazine from "@/components/SwipeMagazine";

export default async function MagazineSlider() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/api/magazines/load-magazines`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
      next: { revalidate: 120 },
    }
  );

  if (!res.ok) {
    throw new Error("Error mounting magazine slider.");
  }

  const data = await res.json();

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Optional subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-[url('/patterns/hex-pattern.svg')] bg-repeat bg-center"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">
            S&T Post Archives
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Explore past issues of our Science & Technology magazines and stay updated on
            DOST innovations and discoveries.
          </p>
        </div>

        {/* Magazine Slider */}
        <div className="relative">
          <SwipeMagazine data={data} />
        </div>

        {/* Year Range */}
        <div className="text-center font-extrabold text-red-600 mt-8 text-lg md:text-2xl">
          2022 - 2025
        </div>

        {/* See More Link */}
        <div className="flex justify-center mt-6">
          <Link
            href="https://www.stii.dost.gov.ph/projects/s-t-publications/2015-10-28-06-07-25"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            <span>See More</span>
            <svg
              className="h-6 w-6 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>arrow-right-thin</title>
              <path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
