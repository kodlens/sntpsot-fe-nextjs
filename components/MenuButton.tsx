"use client";

import { useEffect, useRef, useState } from "react";
import { HamburgerIcon } from "./HamburgerIcon";
import Link from "next/link";

interface Category {
  id: number;
  metadata: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  active: number;
}

interface NextFetchOptions extends RequestInit {
  next?: { revalidate?: number };
}

const MenuButton = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/load-categories`, {
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        next: { revalidate: 60 },
      } as NextFetchOptions);

      if (!res.ok) {
        throw new Error(`Failed to load categories: ${res.status}`);
      }

      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const renderCategories = () => {
    if (isLoading) {
      return (
        <div className="px-3 py-5 text-sm text-slate-500">
          Loading menu...
        </div>
      );
    }

    if (!categories.length) {
      return (
        <div className="px-3 py-5 text-sm text-slate-500">
          No categories available.
        </div>
      );
    }

    const mappedCategories = categories.map((category, index) => (
      <Link
        prefetch={false}
        className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-[#22aae2]/10 hover:text-[#0b6f9b]"
        key={`menu${index}`}
        onClick={() => setOpen(false)}
        href={`/category/${category.slug}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#22aae2]/50 transition-colors duration-200 group-hover:bg-[#fbb040]" />
        {category.title}
      </Link>
    ));

    mappedCategories?.push(
      <Link
        prefetch={false}
        className="mt-2 flex w-full items-center gap-3 border-t border-slate-200 px-3 pb-1 pt-3 text-sm font-semibold text-[#0b6f9b] transition-colors duration-200 hover:text-[#8c5603]"
        key="archives"
        onClick={() => setOpen(false)}
        href="/archives"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#fbb040]" />
        Archives
      </Link>
    );

    return mappedCategories;
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="menu"
        aria-controls="main-menu-dropdown"
        aria-expanded={open}
        className={`group flex h-full items-center gap-1 rounded-xl border px-2.5 py-2 text-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22aae2]/40 ${open ? "border-[#22aae2]/30 bg-[#22aae2]/10 text-[#0b6f9b] shadow-sm" : "border-transparent hover:border-slate-200 hover:bg-slate-50"
          }`}
        onClick={() => setOpen(!open)}
      >
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] md:inline">
          Menu
        </span>
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`} aria-hidden="true">
          <HamburgerIcon className="h-6 w-6" />
        </span>
      </button>

      <div
        id="main-menu-dropdown"
        className={`absolute right-0 z-20 mt-2 w-[300px] origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-200 ${open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
          }`}
      >
        <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Browse Sections
        </div>
        <div className="flex max-h-[420px] flex-col overflow-y-auto">
          {renderCategories()}
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
