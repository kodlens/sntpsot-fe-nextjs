import Image from "next/image";
import Link from "next/link";

const AppLogo = () => {
  return (
    <Link
      prefetch={false}
      className="group inline-flex items-center gap-3 rounded-xl border border-transparent px-1 py-1 transition-colors hover:border-[#22aae2]/25"
      href="/"
      aria-label="Go to homepage"
    >
      <Image
        src="/images/logo.png"
        alt="S&T Post emblem"
        width={48}
        height={48}
        className="h-10 w-10 object-contain lg:h-12 lg:w-12"
        priority
      />

      <div className="flex items-center gap-3">
        <span className="hidden h-7 w-px bg-slate-200 md:inline-block" />
        <Image
          src="/images/snt-logo.png"
          alt="S&T Post"
          width={136}
          height={32}
          className="h-7 w-auto object-contain lg:h-8"
          priority
        />
      </div>
    </Link>
  );
};

export default AppLogo;
