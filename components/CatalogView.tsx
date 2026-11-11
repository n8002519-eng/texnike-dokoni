"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Check,
  Flame,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Product, SortOption } from "@/types";
import { CATEGORIES, formatPrice } from "@/lib/utils";

interface CatalogViewProps {
  initialProducts: Product[];
}

export function CatalogView({ initialProducts }: CatalogViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial values from query parameters
  const initialCategory = searchParams.get("kategoriya") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = (searchParams.get("saralash") as SortOption) || "mashhur";
  const initialDiscount = searchParams.get("chegirma") === "ha";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [selectedSort, setSelectedSort] = useState<SortOption>(initialSort);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(initialDiscount);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setSelectedCategory(searchParams.get("kategoriya") || "all");
    setSearchTerm(searchParams.get("search") || "");
    setSelectedSort((searchParams.get("saralash") as SortOption) || "mashhur");
    setOnlyDiscounted(searchParams.get("chegirma") === "ha");
  }, [searchParams]);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      list = list.filter(
        (p) => p.categorySlug.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Only discounted
    if (onlyDiscounted) {
      list = list.filter((p) => p.isDiscounted);
    }

    // Min price
    if (minPrice && !isNaN(Number(minPrice))) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }

    // Max price
    if (maxPrice && !isNaN(Number(maxPrice))) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    // Sorting
    switch (selectedSort) {
      case "arzon":
        list.sort((a, b) => a.price - b.price);
        break;
      case "qimmat":
        list.sort((a, b) => b.price - a.price);
        break;
      case "yangi":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "mashhur":
      default:
        list.sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount);
        break;
    }

    return list;
  }, [
    initialProducts,
    selectedCategory,
    searchTerm,
    onlyDiscounted,
    minPrice,
    maxPrice,
    selectedSort,
  ]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setOnlyDiscounted(false);
    setSelectedSort("mashhur");
    router.push("/katalog");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchTerm.trim() !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    onlyDiscounted;

  return (
    <div className="py-6 sm:py-10">
      {/* Header & Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Mahsulotlar katalogi
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Jami {filteredProducts.length} ta mahsulot topildi
        </p>
      </div>

      {/* Top filter & sorting control bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 mb-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search inside catalog */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Katalog ichidan qidirish..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200"
          >
            <Filter className="w-4 h-4" />
            <span>Filtrlar</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline whitespace-nowrap">
              Saralash:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as SortOption)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="mashhur">Mashhurlik bo&apos;yicha</option>
              <option value="arzon">Narx: Arzondan qimmatga</option>
              <option value="qimmat">Narx: Qimmatdan arzonga</option>
              <option value="yangi">Eng yangi tovarlar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-6 sticky top-28 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filtrlar</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Tozalash</span>
              </button>
            )}
          </div>

          {/* Category List */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Kategoriyalar
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>Barcha kategoriyalar</span>
                <span className="text-[11px] opacity-75">
                  {initialProducts.length}
                </span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = initialProducts.filter(
                  (p) => p.categorySlug.toLowerCase() === cat.slug.toLowerCase()
                ).length;
                const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discount only checkbox */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>Faqat chegirmadagilar</span>
              </span>
            </label>
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Narx oralig&apos;i (so&apos;m)
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Dan
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Gacha
                </label>
                <input
                  type="number"
                  placeholder="50 000 000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Quick price presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => {
                  setMinPrice("0");
                  setMaxPrice("3000000");
                }}
                className="px-2 py-1 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                3 mln gacha
              </button>
              <button
                onClick={() => {
                  setMinPrice("3000000");
                  setMaxPrice("10000000");
                }}
                className="px-2 py-1 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                3 - 10 mln
              </button>
              <button
                onClick={() => {
                  setMinPrice("10000000");
                  setMaxPrice("");
                }}
                className="px-2 py-1 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                10 mln dan yuqori
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Hech qanday mahsulot topilmadi
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Qidiruv so&apos;zini o&apos;zgartirib ko&apos;ring yoki filtrlarni tozalang.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
              >
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="relative ml-auto w-full max-w-xs h-full bg-white dark:bg-slate-900 p-6 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Filtrlar
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                Kategoriya
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Barcha kategoriyalar
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                      selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Discount */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={(e) => setOnlyDiscounted(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Faqat chegirmadagilar
                </span>
              </label>
            </div>

            {/* Price Inputs */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                Narx oralig&apos;i
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
                <input
                  type="number"
                  placeholder="Maks"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
              >
                Natijalarni ko&apos;rish ({filteredProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    resetFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="w-full mt-2 py-2 text-xs text-red-500 font-semibold"
                >
                  Filtrlarni tozalash
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
