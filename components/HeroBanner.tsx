"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  image: string;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: "Yangi avlod flagmani",
    title: "Apple iPhone 15 Pro Max",
    subtitle: "Titanium korpus, kuchli A17 Pro chipi va 5x optik zoom. Hoziroq buyurtma bering!",
    linkText: "Xarid qilish",
    linkHref: "/mahsulot/apple-iphone-15-pro-max-256gb",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
    bgGradient: "from-slate-900 via-blue-950 to-slate-900",
  },
  {
    id: 2,
    tag: "Kuch va nafosat",
    title: "MacBook Air 13 M3",
    subtitle: "18 soatlik batareya, shovqinsiz ishlash va yuqori unumdorlik. O'qish va dasturlash uchun eng yaxshi tanlov.",
    linkText: "Batafsil ko'rish",
    linkHref: "/mahsulot/apple-macbook-air-13-m3",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    bgGradient: "from-blue-950 via-indigo-950 to-slate-900",
  },
  {
    id: 3,
    tag: "Chegirmalar mavsumi",
    title: "Audio va Gadjetlar -15%",
    subtitle: "AirPods, Sony WH-1000XM5, Marshall va Apple Watch soatlariga maxsus chegirmalar!",
    linkText: "Chegirmalarga o'tish",
    linkHref: "/katalog?chegirma=ha",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    bgGradient: "from-slate-900 via-rose-950 to-slate-900",
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white my-6">
      {/* Background Gradient */}
      <div
        className={`relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center bg-gradient-to-r ${slide.bgGradient} transition-all duration-700`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {slide.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href={slide.linkHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:gap-3"
              >
                <span>{slide.linkText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-colors border border-white/10"
              >
                Katalogni ko&apos;rish
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md mx-auto">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={prevSlide}
          aria-label="Oldingi slayd"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/10 z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Keyingi slayd"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/10 z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slayd ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx
                  ? "w-8 bg-blue-500"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
