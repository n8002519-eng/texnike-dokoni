import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Cable,
  Home,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES } from "@/lib/utils";
import { getAllProducts } from "@/lib/products";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
  Tablet: <Tablet className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Watch: <Watch className="w-6 h-6" />,
  Cable: <Cable className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
};

export function CategoryGrid() {
  const allProducts = getAllProducts();

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Kategoriyalar
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kerakli texnika va gadjetlarni oson toping
          </p>
        </div>
        <Link
          href="/katalog"
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group"
        >
          <span>Barchasini ko&apos;rish</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const count = allProducts.filter(
            (p) => p.categorySlug.toLowerCase() === cat.slug.toLowerCase()
          ).length;

          return (
            <Link
              key={cat.id}
              href={`/katalog?kategoriya=${cat.slug}`}
              className="group relative bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform overflow-hidden">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  iconMap[cat.iconName] || <Smartphone className="w-6 h-6" />
                )}
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {count} ta mahsulot
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
