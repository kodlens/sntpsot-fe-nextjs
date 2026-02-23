"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

interface AnimatedFeaturedProps {
  image: string;
  title: string;
  excerpt: string;
  slug: string;
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AnimatedFeatured({
  image,
  title,
  excerpt,
  slug,
}: AnimatedFeaturedProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg"
    >
      <div
        className="h-[420px] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="absolute inset-0 bg-linear-to-t from-[#031b37]/90 via-[#031b37]/45 to-transparent p-6 flex flex-col justify-end">
        <div className="mb-3 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#22aae2_0%,#fbb040_100%)]" />
        <Link prefetch={false} href={`/dost/${slug}`}>
          <h2 className="mb-3 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-[#fbb040] md:text-3xl">
            {title}
          </h2>
        </Link>
        <p className="text-sm md:text-base text-gray-200 line-clamp-3">
          {excerpt}
        </p>
      </div>
    </motion.div>
  );
}
