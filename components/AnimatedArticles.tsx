"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

interface AnimatedArticleProps {
  image: string;
  title: string;
  slug: string;
  delay?: number;
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AnimatedArticle({
  image,
  title,
  slug,
  delay = 0,
}: AnimatedArticleProps) {
  return (
    <motion.article
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className="relative rounded-xl overflow-hidden shadow-lg group"
    >
      <div
        className="h-[200px] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
        <Link prefetch={false} href={`/dost/${slug}`}>
          <h3 className="text-white text-lg font-semibold line-clamp-2 transition-colors group-hover:text-[#fbb040]">
            {title}
          </h3>
        </Link>
      </div>
    </motion.article>
  );
}
