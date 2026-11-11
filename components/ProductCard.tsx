"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check, Zap } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors ? product.colors[0] : undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges on top of card */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="px-2.5 py-1 text-[11px] font-black uppercase rounded-lg bg-red-600 text-white shadow-sm flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" />
            -{product.discountPercentage}%
          </span>
        )}
        {product.badge && (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-600/90 text-white shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link
        href={`/mahsulot/${product.slug}`}
        className="relative w-full aspect-square bg-slate-50 dark:bg-slate-800/60 overflow-hidden block"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            href={`/mahsulot/${product.slug}`}
            className="block text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing and Cart button */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-end justify-between gap-2">
            <div>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="block text-[11px] text-slate-400 dark:text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Quick add button */}
            <button
              onClick={handleAddToCart}
              aria-label={`${product.name} savatga qo'shish`}
              className={`p-2.5 rounded-xl font-medium text-xs flex items-center justify-center transition-all ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
              }`}
            >
              {isAdded ? (
                <Check className="w-5 h-5 animate-in zoom-in" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
