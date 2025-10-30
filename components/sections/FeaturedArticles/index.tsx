import AnimatedArticle from "@/components/AnimatedArticles";
import AnimatedFeatured from "@/components/AnimatedFeatured";

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
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
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

  if (!articles || articles.length === 0) return null;

  const [main, ...rest] = articles;

  const image = (img?: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/featured_images/${
      img || "img/no-img.png"
    }`;

  return (
    <section
      className="relative py-16 lg:py-24 text-gray-900 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%)",
      }}
    >

      <div
        className="absolute inset-0 opacity-10 bg-[url('/images/hex-tech.svg')] bg-repeat bg-center"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Title and subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 drop-shadow-sm">
            S&T Updates
          </h2>
          <p className="mt-3 text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
            Stay informed with the latest breakthroughs, innovations, and news
            in Science and Technology from DOST–STII.
          </p>
        </div>

        {/* Articles section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main featured article */}
          <div className="flex-1">
            <AnimatedFeatured
              image={image(main.featured_image)}
              title={main.title}
              excerpt={main.excerpt}
              slug={main.slug}
            />
          </div>

          {/* Smaller articles */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rest.slice(0, 4).map((item, i) => (
              <AnimatedArticle
                key={item.id}
                image={image(item.featured_image)}
                title={item.title}
                slug={item.slug}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
