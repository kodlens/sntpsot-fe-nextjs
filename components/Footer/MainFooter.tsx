import Link from "next/link";
import Image from "next/image";
import type { Category } from "../../types/category";
import Copyright from "./Copyright";

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/load-categories`, {
      cache: "no-store",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      return [];
    }

    const categories = await res.json();
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("Failed to load footer categories", error);
    return [];
  }
};

const MainFooter = async () => {
  const categories = await getCategories();
  const categoryLinks = categories.filter((item) => item.slug);

  return (
    <footer className="w-full overflow-hidden bg-[#071d2f] text-white">
      <div className="h-1 bg-[linear-gradient(90deg,#22aae2_0%,#fbb040_100%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#22aae2]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#fbb040]/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr_0.8fr] lg:gap-12">
          <div>
            <Link prefetch={false} href="/" aria-label="Go to homepage" className="inline-flex">
              <Image
                src="/images/dost-logo.png"
                alt="DOST S&T Post"
                width={360}
                height={67}
                className="h-auto w-full max-w-[300px]"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
              Science, technology, and innovation stories from DOST-STII, gathered for readers across the Philippines.
            </p>

            <div className="mt-7 flex flex-col gap-3 text-sm text-slate-300">
              <a
                href="mailto:dost.digest@gmail.com"
                className="group inline-flex w-fit items-center gap-3 transition-colors hover:text-[#fbb040]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-[#fbb040]/50">
                  <Image src="/socials/icons8-email-50.png" width={18} height={18} alt="" />
                </span>
                dost.digest@gmail.com
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61567961533594"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-3 transition-colors hover:text-[#fbb040]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-[#fbb040]/50">
                  <Image src="/socials/icons8-facebook-50.png" width={19} height={19} alt="" />
                </span>
                S&amp;T Facebook Page
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#80CAEE]">
              Categories
            </h2>

            {categoryLinks.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {categoryLinks.map((item) => (
                  <Link
                    key={item.id}
                    prefetch={false}
                    href={`/category/${item.slug}`}
                    className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#fbb040] opacity-70 transition-opacity group-hover:opacity-100" />
                    {item.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-400">Categories are currently unavailable.</p>
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#80CAEE]">
              Explore
            </h2>

            <nav className="mt-5 flex flex-col gap-3 text-sm text-slate-300" aria-label="Footer navigation">
              <Link prefetch={false} href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <Link prefetch={false} href="/category" className="transition-colors hover:text-white">
                All Categories
              </Link>
              <Link prefetch={false} href="/dost" className="transition-colors hover:text-white">
                DOSTv
              </Link>
              <Link prefetch={false} href="/#latest-stories" className="transition-colors hover:text-white">
                Latest Stories
              </Link>
            </nav>

            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#fbb040]">
                Published by DOST-STII
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Information and communication support for Philippine science and technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Copyright />
    </footer>
  );
};

export default MainFooter;
