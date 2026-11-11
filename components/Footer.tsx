import Link from "next/link";
import {
  Cpu,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Send,
} from "lucide-react";
import { CATEGORIES } from "@/lib/utils";

export function Footer() {
  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "texnodokon_uz";
  const contactPhone = process.env.NEXT_PUBLIC_PHONE || "+998 71 200 00 00";

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Benefit Highlights */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Tez va bepul yetkazish
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toshkent bo&apos;yicha 3 soatda, viloyatlarga 24 soatda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  100% Rasmiy kafolat
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Barcha tovarlarga ishlab chiqaruvchidan 1 yil kafolat
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Oson almashtirish
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  14 kun ichida nuqsonsiz qaytarish yoki almashtirish
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Texno<span className="text-blue-500">Dokon</span>
                </span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                  O&apos;zbekistonda texnika do&apos;koni
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Eng so&apos;nggi rusumdagi smartfonlar, noutbuklar va aqlli maishiy texnikalarni arzon narxlarda va rasmiy kafolat bilan xarid qiling.
            </p>

            {/* Telegram Channel CTA */}
            <div className="pt-2">
              <a
                href={`https://t.me/${telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-sm font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Telegram kanalimiz: @{telegramUsername}</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Kategoriyalar
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/katalog?kategoriya=${cat.slug}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/katalog"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Barcha tovarlar →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Xaridorlarga
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/katalog?chegirma=ha" className="hover:text-blue-400 transition-colors">
                  Chegirmalar va aksiyalar
                </Link>
              </li>
              <li>
                <Link href="/aloqa#yetkazib-berish" className="hover:text-blue-400 transition-colors">
                  Yetkazib berish xizmati
                </Link>
              </li>
              <li>
                <Link href="/aloqa#kafolat" className="hover:text-blue-400 transition-colors">
                  Kafolat va servis markazlari
                </Link>
              </li>
              <li>
                <Link href="/aloqa#faq" className="hover:text-blue-400 transition-colors">
                  Ko&apos;p beriladigan savollar
                </Link>
              </li>
              <li>
                <Link href="/savat" className="hover:text-blue-400 transition-colors">
                  Savatdagi mahsulotlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Bog&apos;lanish
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-slate-400">
                  Toshkent sh., Yunusobod t., Amir Temur shox ko&apos;chasi, 128-uy
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="text-white hover:text-blue-400 font-medium transition-colors"
                >
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">Har kuni: 09:00 - 21:00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">info@texnodokon.uz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment badges & copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TexnoDokon. Barcha huquqlar himoyalangan. O&apos;zbekiston bo&apos;ylab sifatli texnika xaridi.
          </p>

          {/* Payment methods */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500 mr-1">To&apos;lov usullari:</span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">
              Payme
            </span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">
              Click
            </span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">
              Uzcard
            </span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">
              Humo
            </span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">
              Naqd
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
