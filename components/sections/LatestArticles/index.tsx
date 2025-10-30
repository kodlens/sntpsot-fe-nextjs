import { Article } from "@/types/article";
import Link from "next/link";

export default async function LatestArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/api/articles/load-latest-articles`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
      next: { revalidate: 120 },
    }
  );

  if (!res.ok) {
    throw new Error("Error loading latest articles.");
  }

  const data = await res.json();

  const truncate = (text: string, limit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <section className="relative py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="text-sm uppercase tracking-widest text-red-700 font-semibold mb-2">
            Discover More
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Latest Articles
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-lg">
            Catch up on the most recent Science & Technology updates, features, and insights from DOST–STII.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((article: Article) => (
            <div
              key={article.id}
              className="group flex flex-col rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white"
            >
              {/* Image */}
              <div
                className="h-56 w-full bg-gray-100 bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/featured_images/${article.featured_image || "img/no-img.png"})`,
                }}
              ></div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="text-sm font-semibold text-blue-700 uppercase mb-1 tracking-wide">
                  {article.category?.title || "Science & Technology"}
                </div>

                <Link
                  href={`/dost/${article.slug}`}
                  prefetch={false}
                  className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 mb-3"
                >
                  {article.title}
                </Link>

                <p className="text-gray-600 text-sm flex-1 mb-5 leading-relaxed">
                  {truncate(article.excerpt || "", 25)}
                </p>

                <Link
                  href={`/dost/${article.slug}`}
                  className="inline-flex items-center text-red-700 font-medium text-sm hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
