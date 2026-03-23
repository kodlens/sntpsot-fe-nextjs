import Link from "next/link";
import AnimatedFeatureStory from "./AnimatedFeatureStory";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
};

async function getFeaturedArticles(): Promise<Article[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/api/articles/load-featured-articles`,
    {
      next: { revalidate: 120 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch featured articles (${res.status})`);
  }

  return res.json();
}

export default async function FeaturedArticles() {
  const articles = await getFeaturedArticles();
  if (!articles?.length) return null;

  const [main, second, ...rest] = articles;
  if (!second) return null;

  const image = (img?: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/featured_images/${img || "img/no-img.png"}`;

  return (
    <section id="featured-stories" className="bg-[#02060f] py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#22aae2]">Feature Story</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Stories shaping science and technology
            </h2>
          </div>
          <Link
            href="/archives"
            className="hidden rounded-full border border-[#fbb040]/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#fbb040] transition hover:bg-[#fbb040] hover:text-[#08101f] md:inline-flex"
          >
            View All
          </Link>
        </div>

        <AnimatedFeatureStory
          main={{
            id: main.id,
            title: main.title,
            excerpt: main.excerpt,
            slug: main.slug,
            image: image(main.featured_image),
          }}
          second={{
            id: second.id,
            title: second.title,
            slug: second.slug,
            image: image(second.featured_image),
          }}
          rest={rest.slice(0, 3).map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            image: image(item.featured_image),
          }))}
        />
      </div>
    </section>
  );
}
