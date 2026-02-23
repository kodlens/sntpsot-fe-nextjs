import { Article } from "@/types/article";
import Link from "next/link";

const truncate = (text: string, limit: number) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : text;
};

const articleImage = (featuredImage?: string) =>
  `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/featured_images/${featuredImage || "img/no-img.png"}`;

export default async function LatestArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/articles/load-latest-articles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error("Error loading latest articles.");
  }

  const data: Article[] = await res.json();
  if (!data?.length) return null;

  const [lead, ...rest] = data;

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-[#f7fcff] py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,170,226,0.12),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(251,176,64,0.12),transparent_38%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between gap-4 md:mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0b6f9b]">Latest Stories</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Fresh Science and Technology Updates
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
              Catch up on recent features, community stories, and key developments from DOST.
            </p>
            <div className="mt-6 h-1 w-36 rounded-full bg-[linear-gradient(90deg,#22aae2_0%,#fbb040_100%)]" />
          </div>

          <Link
            href="/archives"
            className="hidden rounded-full border border-[#22aae2]/40 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0b6f9b] transition hover:border-[#fbb040] hover:text-[#8c5603] md:inline-flex"
          >
            Browse Archive
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <article className="overflow-hidden rounded-3xl border border-[#22aae2]/20 bg-white shadow-xl shadow-[#22aae2]/10 lg:col-span-7">
            <Link prefetch={false} href={`/dost/${lead.slug}`} className="group block">
              <div className="overflow-hidden">
                <div
                  className="aspect-[16/10] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${articleImage(lead.featured_image)})` }}
                />
              </div>

              <div className="p-6 md:p-8">
                <p className="mb-3 inline-flex rounded-full border border-[#22aae2]/30 bg-[#22aae2]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0b6f9b]">
                  {lead.category?.title || "Science & Technology"}
                </p>
                <h3 className="text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-[#8c5603] md:text-4xl">
                  {lead.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{truncate(lead.excerpt || "", 32)}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-[#8c5603]">Read article</span>
              </div>
            </Link>
          </article>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.slice(0, 4).map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-2xl border border-[#22aae2]/15 bg-white shadow-md shadow-[#22aae2]/10"
              >
                <Link prefetch={false} href={`/dost/${article.slug}`} className="group block">
                  <div className="grid grid-cols-1 sm:grid-cols-[170px_1fr] lg:grid-cols-[180px_1fr]">
                    <div className="overflow-hidden">
                      <div
                        className="h-44 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 sm:h-full"
                        style={{ backgroundImage: `url(${articleImage(article.featured_image)})` }}
                      />
                    </div>

                    <div className="p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0b6f9b]">
                        {article.category?.title || "Science & Technology"}
                      </p>
                      <h4 className="mt-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#8c5603]">
                        {article.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{truncate(article.excerpt || "", 16)}</p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
