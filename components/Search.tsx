"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    router.push(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      >
        <path
          fill="currentColor"
          d="M10.5 3a7.5 7.5 0 0 1 5.92 12.1l4.24 4.23-1.42 1.42-4.23-4.24A7.5 7.5 0 1 1 10.5 3m0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11"
        />
      </svg>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search stories, topics, and updates"
        aria-label="Search articles"
        className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-24 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#22aae2] focus:ring-2 focus:ring-[#22aae2]/20"
      />

      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[#22aae2] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0f8fc4]"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
