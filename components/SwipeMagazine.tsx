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
        <Link prefetch={false} href={`/magazines/flipbook/${magazine.slug}`}>
          <div
            className="lg:h-[490px] lg:w-full md:h-[320px] h-[540px] relative bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/magazines/${magazine.cover})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity rounded-2xl flex items-end p-4">
              <h3 className="text-white font-semibold text-lg md:text-xl line-clamp-2">
                {magazine.title}
              </h3>
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
        640: { slidesPerView: 3 },
      }}
      modules={[Pagination, EffectCoverflow, Navigation]}
      className="mySwiper"
    >
      {renderSlides()}
    </Swiper>
  );
}
