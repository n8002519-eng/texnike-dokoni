"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Cpu,
  Layers,
  PhoneCall,
  Flame,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import { CATEGORIES } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/katalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">
              Butun O&apos;zbekiston bo&apos;ylab 24 soat ichida yetkazib berish!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-blue-100">
            <Link href="/aloqa" className="hover:text-white transition-colors flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Yordam: +998 (71) 200-00-00</span>
            </Link>
            <span className="text-blue-300">|</span>
            <span>100% Rasmiy kafolat</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Texno<span className="text-blue-600">Dokon</span>
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1 hidden sm:block">
                Elektronika do&apos;koni
              </p>
            </div>
          </Link>

          {/* Catalog Button (Desktop) */}
          <Link
            href="/katalog"
            className="hidden lg:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm shadow-blue-600/25 flex-shrink-0"
          >
            <Layers className="w-4 h-4" />
            <span>Katalog</span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl relative hidden sm:block"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mahsulot nomi yoki modelini qidiring (masalan: iPhone 15, M3, Sony)..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              Qidirish
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark/Light mode toggle */}
            <ThemeToggle />

            {/* Discounts quick link */}
            <Link
              href="/katalog?chegirma=ha"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-semibold text-red-600 dark:text-red-400 transition-colors"
              title="Chegirmalar"
            >
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Chegirmalar</span>
            </Link>

            {/* Cart Button */}
            <Link
              href="/savat"
              className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 group"
              aria-label="Savat"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-sm font-medium">Savat</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
              aria-label="Menyuni ochish"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="w-full pl-9 pr-20 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-500 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg"
            >
              Topish
            </button>
          </form>
        </div>
      </div>

      {/* Category quick links bar (Desktop) */}
      <div className="hidden lg:block border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-6 overflow-x-auto py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 no-scrollbar">
            <Link
              href="/katalog"
              className="hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              Barcha tovarlar
            </Link>
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/katalog?kategoriya=${category.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/aloqa"
              className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors whitespace-nowrap"
            >
              Biz haqimizda & Aloqa
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="font-semibold text-xs uppercase tracking-wider text-slate-400 px-2">
            Kategoriyalar
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/katalog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              Barcha mahsulotlar
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/katalog?kategoriya=${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/katalog?chegirma=ha"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 text-sm font-semibold text-red-600 dark:text-red-400"
            >
              <Flame className="w-4 h-4" />
              <span>Chegirmalar va aksiyalar</span>
            </Link>
            <Link
              href="/aloqa"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Bog&apos;lanish va Do&apos;konlar</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
