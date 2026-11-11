"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } =
    useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "TEXNO" || promoCode.trim().toUpperCase() === "TEXNO2026") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Noto'g'ri promokod. 'TEXNO' promokodini sinab ko'ring.");
      setPromoApplied(false);
    }
  };

  const discountAmount = promoApplied ? Math.round(totalPrice * 0.05) : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24 text-center max-w-lg mx-auto space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Savatingiz hozircha bo&apos;sh
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Katalogimizdan o&apos;zingizga ma&apos;qul kelgan eng so&apos;nggi texnikalarni tanlang va xariddan rohatlaning!
          </p>
        </div>
        <Link
          href="/katalog"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-600/25"
        >
          <span>Katalogga o&apos;tish</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Savat ({totalItems} ta mahsulot)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Buyurtmangizni tekshiring va rasmiylashtiring
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          <span>Savatni tozalash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor || "default"}`}
              className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
            >
              {/* Product Thumbnail */}
              <Link
                href={`/mahsulot/${item.product.slug}`}
                className="relative w-24 h-24 rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-2 flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-contain p-1"
                />
              </Link>

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <Link
                  href={`/mahsulot/${item.product.slug}`}
                  className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {item.product.name}
                </Link>
                {item.selectedColor && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Rang: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.selectedColor}</span>
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-0.5">
                  1 dona: {formatPrice(item.product.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-1">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity - 1,
                        item.selectedColor
                      )
                    }
                    aria-label="Kamaytirish"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-slate-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity + 1,
                        item.selectedColor
                      )
                    }
                    aria-label="Ko'paytirish"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="min-w-[120px] text-right font-black text-sm text-slate-900 dark:text-white">
                  {formatPrice(item.product.price * item.quantity)}
                </div>

                {/* Remove button */}
                <button
                  onClick={() =>
                    removeFromCart(item.product.id, item.selectedColor)
                  }
                  aria-label="O'chirish"
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Buyurtma hisobi
            </h3>

            {/* Promo code input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promokod (TEXNO)"
                    className="w-full pl-8 pr-3 py-2 rounded-xl text-xs uppercase font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white uppercase focus:outline-none focus:border-blue-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Qo&apos;llash
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>5% chegirma qo&apos;llandi!</span>
                </p>
              )}
              {promoError && (
                <p className="text-xs text-red-500 font-medium">{promoError}</p>
              )}
            </form>

            {/* Cost breakdown */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Mahsulotlar ({totalItems} dona):</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promokod chegirmasi (5%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Yetkazib berish:</span>
                <span className="text-emerald-600 font-semibold">Bepul</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Jami to&apos;lov:
                </span>
                <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                  {formatPrice(finalPrice)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/buyurtma"
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>Rasmiylashtirishga o&apos;tish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Guarantee info */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Xavfsiz va kafolatlangan to&apos;lov</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>O&apos;zbekiston bo&apos;ylab bepul tezkor yetkazish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
