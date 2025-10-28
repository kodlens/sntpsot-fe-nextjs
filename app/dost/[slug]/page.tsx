import NotFound from "@/components/NotFound";
import { fetchWithToken } from "@/lib/fetcher";
import DOMPurify from "isomorphic-dompurify";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URI}/api/articles/fetch-article/${slug}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );

    console.log('meta',  res);
    
  try {
   

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const article = await res.json();

    console.log('article',  article);

    const description = article.description
      ? article.description.replace(/<[^>]*>?/gm, "").slice(0, 160)
      : "Read this article on our site.";

    const imageUrl = article.featured_image
      ? article.featured_image.startsWith("http")
        ? article.featured_image
        : `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/featured_images/${article.featured_image}`
      : `${process.env.NEXT_PUBLIC_APP_URL}/default-og.png`;

    return {
      title: article.title || "Untitled Article",
      description,
      openGraph: {
        title: article.title,
        description,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/articles/${slug}`,
        siteName: "My Awesome Site",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        type: "article",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
        images: [imageUrl],
      },
    };
  } catch (err) {
    console.error("Metadata error:", err);
    return {
      title: "Article Not Found",
      description: "This article could not be found.",
    };
  }
}


export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  if (!/^[a-z0-9-]+$/i.test(slug)) return <NotFound />;


  const article = await fetchWithToken(`/api/articles/fetch-article/${slug}`);
  console.log('main component', article);

  const safeDescription = DOMPurify.sanitize(article.description);

  try {

    return (
      <>
        <div className="max-w-3xl mx-auto py-10">
          <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: safeDescription }}
            />
          </div>
        </div>
      </>
    );
  } catch {
    return <NotFound />;
  }
}
