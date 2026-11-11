import Link from "next/link";
import {
  Flame,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
  CheckCircle,
} from "lucide-react";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { getDiscountedProducts, getFeaturedProducts, getNewProducts } from "@/lib/products";

export default function HomePage() {
  const discountedProducts = getDiscountedProducts(8);
  const featuredProducts = getFeaturedProducts(8);
  const newProducts = getNewProducts(4);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Carousel */}
      <HeroBanner />

      {/* Trust & USP Quick Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Tezkor yetkazish
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              O&apos;zbekiston bo&apos;ylab 24 soatda
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              100% Rasmiy kafolat
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              1 yil servis markazi kafolati
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Qulay to&apos;lov
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Payme, Click yoki naqd
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              24/7 Qo&apos;llab-quvvatlash
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Professional mutaxassis maslahati
            </p>
          </div>
        </div>
      </section>

      {/* 2. Categories Grid */}
      <CategoryGrid />

      {/* 3. "Chegirmalar" (Discounts) Section */}
      <section className="bg-gradient-to-br from-red-500/5 via-rose-500/5 to-transparent p-6 sm:p-8 rounded-3xl border border-red-200/60 dark:border-red-950/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30">
              <Flame className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Katta chegirmalar
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                  Aksiya
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Cheklangan vaqt ichida eng yaxshi narxlardagi tovarlar
              </p>
            </div>
          </div>
          <Link
            href="/katalog?chegirma=ha"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 group"
          >
            <span>Barcha chegirmalar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {discountedProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner Strip */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
            Maxsus Taklif
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Telegram botimiz orqali buyurtma bering va sovg&apos;aga ega bo&apos;ling!
          </h3>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Bizning Telegram akkauntimiz orqali rasmiylashtirilgan har bir xarid uchun bepul ekspress yetkazib berish va qo&apos;shimcha sovg&apos;a taqdim etiladi.
          </p>
          <div className="pt-2">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
            >
              <span>Xarid qilishni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Featured Products ("Ommabop mahsulotlar") */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Ommabop mahsulotlar
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Xaridorlarimiz tomonidan eng ko&apos;p tanlangan va yuqori baholangan texnikalar
            </p>
          </div>
          <Link
            href="/katalog?saralash=mashhur"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>Katalogga o&apos;tish</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Why TexnoDokon? Trust / Quality section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Bizning ustunligimiz
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Nega aynan TexnoDokon?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Mijozlarimiz bizni qulay narxlar, ishonchlilik va yuqori darajadagi servis uchun tanlashadi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Faqat original mahsulotlar
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Biz faqat Apple, Samsung, Xiaomi, Asus, Dyson kabi jahonning yetakchi brendlarining asl tovarlarini rasmiy distribyutorlardan yetkazib beramiz.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Shaxsiy tekshirish va kafolat
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Yetkazib beruvchi kuryer tovaringizni oldingizda ochib ko&apos;rsatadi va kafolat talonini topshiradi. Faqat tekshirgach to&apos;lov qilasiz.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Telegram orqali tezkor buyurtma
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Ortiqcha ro&apos;yxatdan o&apos;tishsiz bir necha bosishda Telegram orqali to&apos;g&apos;ridan-to&apos;g&apos;ri menejerimizga buyurtma jo&apos;natishingiz mumkin.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
