"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartToast() {
  const { lastAddedProduct, resetLastAdded } = useCart();

  useEffect(() => {
    if (!lastAddedProduct) return;
    const timer = setTimeout(() => {
      resetLastAdded();
    }, 4000);
    return () => clearTimeout(timer);
  }, [lastAddedProduct, resetLastAdded]);

  if (!lastAddedProduct) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700">
          <Image
            src={lastAddedProduct.images[0]}
            alt={lastAddedProduct.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Savatga qo&apos;shildi</span>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {lastAddedProduct.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-semibold">
            {formatPrice(lastAddedProduct.price)}
          </p>
        </div>
        <button
          onClick={resetLastAdded}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          aria-label="Yopish"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <Link
          href="/savat"
          onClick={resetLastAdded}
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Savatga o&apos;tish</span>
        </Link>
        <button
          onClick={resetLastAdded}
          className="text-xs font-medium py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Davom etish
        </button>
      </div>
    </div>
  );
}
