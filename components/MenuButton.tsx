"use client";

import { useEffect, useRef, useState } from "react";
import { HamburgerIcon } from "./HamburgerIcon";
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<Category[]>();

  const loadCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/load-categories`, {
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        next: { revalidate: 60 },
      } as NextFetchOptions);

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderCategories = () => {
    const mappedCategories = categories?.map((category, index) => (
      <Link
        prefetch={false}
        className="w-full hover:bg-blue-50 px-6 py-2 rounded transition-colors duration-200"
        key={`menu${index}`}
        onClick={() => setOpen(false)}
        href={`/category/${category.slug}`}
      >
        {category.title}
      </Link>
    ));

    mappedCategories?.push(
      <Link
        prefetch={false}
        className="w-full hover:bg-blue-50 px-6 py-2 rounded transition-colors duration-200 border-t border-blue-100 mt-2 pt-2"
        key="archives"
        onClick={() => setOpen(false)}
        href="/archives"
      >
        Archives
      </Link>
    );

    return mappedCategories;
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="flex items-center h-full md:ml-4 px-4 py-2 hover:bg-blue-200 transition ease-in-out duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        onClick={() => setOpen(!open)}
      >
        <span className="hidden md:inline uppercase font-semibold text-black mr-2">Menu</span>
        <HamburgerIcon />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 z-20 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-blue-100 ring-opacity-5 transform transition-all duration-300 ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <div className="flex flex-col w-[300px] p-2">
          {renderCategories()}
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
