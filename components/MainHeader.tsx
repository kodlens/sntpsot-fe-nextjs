import AppLogo from "./AppLogo";
import MenuButton from "./MenuButton";
import MagnifyGlass from "./Magnifying/Magnifying";
import Search from "./Search";

const MainHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="h-1 bg-[linear-gradient(90deg,#22aae2_0%,#fbb040_100%)]" />

      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 md:gap-6 md:py-5">
        <div className="shrink-0">
          <AppLogo />
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <div className="hidden w-[260px] md:block lg:w-[320px]">
            <Search />
          </div>

          <div className="flex items-center rounded-2xl border border-slate-200 bg-white/90 px-1 py-1 shadow-sm">
            <div className="relative">
              <MagnifyGlass />
            </div>
            <MenuButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
