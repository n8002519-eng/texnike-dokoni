"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Check,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Send,
  Heart,
  Share2,
  Minus,
  Plus,
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "texnodokon_uz";

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickBuy = () => {
    addToCart(product, quantity, selectedColor);
    router.push("/buyurtma");
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Left: Images Gallery */}
      <div className="space-y-4">
        {/* Main image container */}
        <div className="relative aspect-square w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 flex items-center justify-center overflow-hidden shadow-sm">
          {/* Discount badge */}
          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-black uppercase rounded-xl bg-red-600 text-white shadow-sm flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-white" />
              -{product.discountPercentage}% Chegirma
            </div>
          )}

          <div className="relative w-full h-full">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Thumbnail gallery */}
        {product.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                aria-label={`Rasm ${idx + 1}`}
                className={`relative w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border-2 overflow-hidden flex-shrink-0 transition-all ${
                  selectedImageIndex === idx
                    ? "border-blue-600 ring-2 ring-blue-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} - ${idx + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Purchase Details */}
      <div className="space-y-6">
        <div>
          {/* Category & Badge */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/katalog?kategoriya=${product.categorySlug}`}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-wider"
            >
              {product.category}
            </Link>
            {product.badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {product.name}
          </h1>

          {/* Rating, reviews, stock */}
          <div className="flex items-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount} ta sharh)</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Omborda mavjud ({product.stock} dona)</span>
            </div>
          </div>
        </div>

        {/* Pricing block */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-base sm:text-lg text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          {product.oldPrice && product.oldPrice > product.price && (
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Siz {formatPrice(product.oldPrice - product.price)} tejaysiz!
            </p>
          )}
        </div>

        {/* Color Selector if available */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Rang: <span className="text-slate-900 dark:text-white font-semibold">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    selectedColor === color
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            Miqdori
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Kamaytirish"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center font-bold text-sm text-slate-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                aria-label="Ko'paytirish"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs text-slate-400">
              Jami: {formatPrice(product.price * quantity)}
            </span>
          </div>
        </div>

        {/* Action Buttons: Savatga qo'shish + Bir bosishda xarid qilish */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:shadow-lg"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Savatga qo&apos;shildi!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Savatga qo&apos;shish</span>
                </>
              )}
            </button>

            <button
              onClick={handleQuickBuy}
              className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Bir bosishda xarid qilish</span>
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Havola nusxalandi!" : "Ulashish"}</span>
            </button>
            <span>•</span>
            <a
              href={`https://t.me/${telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors"
            >
              <Send className="w-4 h-4 text-sky-500" />
              <span>Telegram orqali savol berish</span>
            </a>
          </div>
        </div>

        {/* Guarantees Box */}
        <div className="border-t border-slate-200/80 dark:border-slate-800 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
            <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <span>1 yil rasmiy kafolat</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
            <Truck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span>24 soatda yetkazish</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
            <RotateCcw className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <span>14 kun qaytarish</span>
          </div>
        </div>
      </div>
    </div>
  );
}
