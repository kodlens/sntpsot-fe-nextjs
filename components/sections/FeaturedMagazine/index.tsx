import Link from "next/link";

export default async function FeaturedMagazine() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/api/magazines/load-featured-magazine`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
      next: { revalidate: 120 },
    }
  );

  if (!res.ok) throw new Error("Failed to load featured magazine.");

  const data = await res.json();

  const truncate = (text: string, limit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  return (
    <section className="relative bg-[#0d1117] py-16 lg:py-24 overflow-hidden">
      {/* Subtle glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-indigo-900/30" />
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/patterns/hex-tech.svg')] bg-repeat bg-center" />

      <div className="relative max-w-7xl mx-auto px-4 text-white">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white">
            Featured S&T Magazine
          </h2>
          <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Explore the latest edition of our Science and Technology magazine, showcasing
            innovations, discoveries, and stories from across the DOST community.
          </p>
        </div>

        {/* Magazine Card */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6 lg:p-10 backdrop-blur-md">
          {/* Cover */}
          <Link
            href={`/magazines/flipbook/${data?.slug}`}
            className="relative group rounded-2xl overflow-hidden shadow-xl hover:scale-[1.03] transition-transform duration-300"
          >
            <div
              className="w-[260px] h-[360px] bg-gray-300"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/magazines/${data?.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs tracking-wider text-gray-300 group-hover:text-white transition">
              Click to View Flipbook →
            </div>
          </Link>

          {/* Magazine Info */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              ABOUT THE COVER
            </h3>
             <h4 className="text-md md:text-xl font-bold text-white mb-4">
              {data?.title}
            </h4>
            <div
              className="text-gray-300 leading-relaxed text-[1.05rem] mb-6"
              dangerouslySetInnerHTML={{
                __html: truncate(`${data?.excerpt}`, 80),
              }}
            />
            <Link
              href={`/magazines/flipbook/${data?.slug}`}
              prefetch={false}
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              Read the Magazine
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
