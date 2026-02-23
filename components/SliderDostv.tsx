"use client";

import { ReactPlayerProps } from "react-player/types";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ReactPlayerAddOn extends ReactPlayerProps {
  url: string;
}

interface Video {
  id?: number;
  title?: string;
  description?: string;
  link: string;
}

interface DostvData {
  dostv: {
    title: string;
    description: string;
    featured_image: string;
    website: string;
    link: string;
  };
  videos: Video[];
}

export default function SliderDostv({ data }: { data: DostvData }) {
  const videos = data?.videos || [];

  const settings = {
    dots: true,
    infinite: videos.length > 1,
    slidesToShow: 1,
    autoplay: videos.length > 1,
    speed: 650,
    autoplaySpeed: 4200,
    arrows: false,
    adaptiveHeight: true,
  };

  if (!videos.length) {
    return (
      <div className="rounded-2xl border border-white/15 bg-[#021024]/60 p-6 text-center text-sm text-slate-300">
        No videos available right now.
      </div>
    );
  }

  return (
    <div className="dostv-slider">
      <Slider {...settings}>
        {videos.map((video: Video, index: number) => (
          <div key={video.id || index} className="px-1">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#021024]/70 shadow-lg">
              <div className="aspect-video w-full overflow-hidden">
                <ReactPlayer
                  {...({
                    url: video.link,
                    controls: true,
                    width: "100%",
                    height: "100%",
                    className: "react-player",
                  } as ReactPlayerAddOn)}
                />
              </div>
              <div className="px-4 py-3">
                <p className="line-clamp-2 text-sm font-semibold text-white">{video.title || "DOSTv Video"}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .dostv-slider .slick-dots {
          bottom: -30px;
        }
        .dostv-slider .slick-dots li button:before {
          color: #94a3b8;
          font-size: 8px;
          opacity: 1;
        }
        .dostv-slider .slick-dots li.slick-active button:before {
          color: #fbb040;
        }
      `}</style>
    </div>
  );
}
