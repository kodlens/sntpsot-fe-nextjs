"use client";
import { Magazine } from "@/types/magazine";
import Link from "next/link";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwipeMagazine({ data }: { data: Magazine[] }) {
  const renderSlides = () =>
    data?.map((magazine: Magazine) => (
      <SwiperSlide key={magazine.id}>
        <Link prefetch={false} href={`/magazines/flipbook/${magazine.slug}`} className="group block">
          <div
            className="relative h-[520px] overflow-hidden rounded-2xl border border-white/15 bg-slate-100 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl md:h-[360px] lg:h-[500px]"
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/magazines/${magazine.cover})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#021023]/90 via-[#021023]/35 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute left-4 top-4 rounded-full border border-[#22aae2]/60 bg-[#22aae2]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#cff4ff]">
              {magazine.quarter ? `Q${magazine.quarter}` : "Issue"} {magazine.year || ""}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="line-clamp-2 text-lg font-semibold text-white md:text-xl">{magazine.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#fbb040]">
                Open Flipbook
              </p>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    ));

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      pagination={{ clickable: true }}
      centeredSlides={true}
      navigation={true}
      loop={true}
      slidesPerView={1}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      modules={[Pagination, EffectCoverflow, Navigation]}
      className="mySwiper [--swiper-navigation-color:#22aae2] [--swiper-navigation-size:26px] [--swiper-pagination-color:#fbb040] [--swiper-pagination-bullet-inactive-color:#64748b]"
    >
      {renderSlides()}
    </Swiper>
  );
}
