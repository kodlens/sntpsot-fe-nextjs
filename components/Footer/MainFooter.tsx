import Link from "next/link";
import Image from "next/image";
import type { Category } from "../../types/category";
import Copyright from "./Copyright";

const MainFooter = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/load-categories`, {
    cache: 'no-store',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
    }
  });

  const categories = await res.json();

  return (
    <footer className="w-full bg-black-2 text-white py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-0">

        {/* Visit & Contact */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div>
            <h3 className="font-bold mb-4">VISIT US</h3>
            <div className="flex items-center gap-2">
              <Image src="/socials/icons8-facebook-50.png" width={23} height={23} alt="Facebook" />
              <a
                href="https://www.facebook.com/profile.php?id=61567961533594"
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-red-600 transition-colors"
              >
                S&T Facebook Page
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">CONTACT US</h3>
            <div className="flex items-center gap-2">
              <Image src="/socials/icons8-email-50.png" width={20} height={20} alt="Email" />
              <a
                href="mailto:dost.digest@gmail.com"
                className="text-sm hover:text-red-600 transition-colors"
              >
                dost.digest@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="lg:w-2/3">
          <h3 className="font-bold mb-4">CATEGORIES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories?.map((item: Category) => (
              <Link
                key={item.id}
                prefetch={false}
                href={`/category/${item.slug}`}
                className="text-sm hover:text-red-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6">
        <Copyright />
      </div>
    </footer>
  );
};

export default MainFooter;
