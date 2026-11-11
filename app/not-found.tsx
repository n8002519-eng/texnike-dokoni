import Link from "next/link";
import { ArrowLeft, Home, Search, Cpu } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-32 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto space-y-6">
      <div className="relative">
        <div className="w-28 h-28 rounded-3xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto shadow-inner">
          <Cpu className="w-14 h-14" />
        </div>
        <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-red-600 text-white font-black text-xs rounded-full shadow-lg">
          404
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Sahifa topilmadi
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Siz qidirayotgan sahifa o&apos;chirilgan, manzili o&apos;zgargan yoki mavjud emas. Bosh sahifaga qayting yoki kerakli tovarlarni katalogdan qidiring.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-600/25"
        >
          <Home className="w-4 h-4" />
          <span>Bosh sahifa</span>
        </Link>
        <Link
          href="/katalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold text-xs transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Katalogga o&apos;tish</span>
        </Link>
      </div>
    </div>
  );
}
