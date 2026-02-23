"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type FeatureItem = {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  image: string;
};

interface AnimatedFeatureStoryProps {
  main: FeatureItem;
  second: FeatureItem;
  rest: FeatureItem[];
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function AnimatedFeatureStory({ main, second, rest }: AnimatedFeatureStoryProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
    >
      <motion.article variants={item} className="lg:col-span-7">
        <Link prefetch={false} href={`/dost/${main.slug}`} className="group block overflow-hidden">
          <div
            className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${main.image})` }}
          />
        </Link>

        <div className="max-w-2xl pt-6">
          <p className="mb-3 inline-flex rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#22aae2]">
            Featured
          </p>
          <Link prefetch={false} href={`/dost/${main.slug}`}>
            <h3 className="text-3xl font-bold leading-tight transition-colors hover:text-[#fbb040] md:text-5xl">
              {main.title}
            </h3>
          </Link>
          {main.excerpt ? <p className="mt-4 max-w-xl text-base text-white/75">{main.excerpt}</p> : null}
        </div>
      </motion.article>

      <motion.article variants={item} className="lg:col-span-5 lg:pt-28">
        <Link prefetch={false} href={`/dost/${second.slug}`} className="group block overflow-hidden">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${second.image})` }}
          />
        </Link>
        <Link prefetch={false} href={`/dost/${second.slug}`}>
          <h3 className="mt-4 text-2xl font-bold leading-tight transition-colors hover:text-[#fbb040]">
            {second.title}
          </h3>
        </Link>
      </motion.article>

      {rest.length > 0 ? (
        <motion.div variants={item} className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
          {rest.slice(0, 3).map((post) => (
            <motion.div key={post.id} whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <Link prefetch={false} href={`/dost/${post.slug}`} className="group block border-t border-white/10 pt-4">
                <div className="overflow-hidden">
                  <div
                    className="aspect-[16/10] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#22aae2]">Story</p>
                <h4 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-[#fbb040]">
                  {post.title}
                </h4>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
