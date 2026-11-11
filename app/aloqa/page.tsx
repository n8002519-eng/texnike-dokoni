"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  HelpCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { formatUzbekPhone } from "@/lib/utils";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "texnodokon_uz";
  const contactPhone = process.env.NEXT_PUBLIC_PHONE || "+998 71 200 00 00";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 14 || !message.trim()) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const text = `📩 BOG'LANISH SO'ROVI — TexnoDokon\n👤 Ism: ${name.trim()}\n📞 Telefon: ${phone.trim()}\n💬 Xabar: ${message.trim()}`;
    const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
    setSubmitted(true);
  };

  return (
    <div className="py-6 sm:py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Mijozlar xizmati
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Biz bilan bog&apos;lanish
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Savollaringiz yoki takliflaringiz bormi? Mutaxassislarimiz har doim sizga yordam berishga tayyor.
        </p>
      </div>

      {/* Main Grid: Contact Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Do&apos;kon manzili va aloqa
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Asosiy manzil</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Toshkent shahri, Yunusobod tumani, Amir Temur shox ko&apos;chasi, 128-uy (Mo&apos;ljal: Shahriston metrosi)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Telefon raqam</h4>
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block mt-0.5"
                  >
                    {contactPhone}
                  </a>
                  <p className="text-slate-400 text-xs">Yagona call-markaz</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Ish vaqti</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Dushanba - Yakshanba: 09:00 dan 21:00 gacha (Dam olish kunlarisiz)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Telegram operator</h4>
                  <a
                    href={`https://t.me/${telegramUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 font-semibold hover:underline block mt-0.5"
                  >
                    @{telegramUsername}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                Xabar yuborish
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Formani to&apos;ldiring, xabaringiz to&apos;g&apos;ridan-to&apos;g&apos;ri Telegram qo&apos;llab-quvvatlash guruhimizga tushadi.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-emerald-800 dark:text-emerald-200">
                  Xabaringiz jo&apos;natildi!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Operatorlarimiz tez orada siz bilan bog&apos;lanishadi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      Ismingiz <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ismingizni kiriting"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      Telefon raqamingiz <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatUzbekPhone(e.target.value))}
                      placeholder="+998 (90) 123-45-67"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Xabaringiz yoki savolingiz <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Qanday mahsulot yoki xizmat bo'yicha ma'lumot olmoqchisiz?"
                    className="w-full p-4 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Xabarni yuborish</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section id="faq" className="space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <span>Ko&apos;p beriladigan savollar (FAQ)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Xaridorlar tomonidan eng ko&apos;p beriladigan savollarga javoblar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Yetkazib berish qancha vaqt oladi va narxi qancha?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Toshkent shahri bo&apos;yicha kuryerlik yetkazib berish 3 soatdan 24 soatgacha va mutlaqo bepul! O&apos;zbekistonning barcha viloyatlariga esa 24-48 soat ichida ishonchli yetkaziladi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Mahsulotlarga kafolat beriladimi?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ha, barcha texnikalarimizga rasmiy servis kafolati beriladi (odatda 1 yildan 2 yilgacha). Tovar bilan birga rasmiy kafolat taloni taqdim etiladi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Qanday to&apos;lov usullari mavjud?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Siz buyurtmani olganingizdan so&apos;ng kuryerga naqd yoki Humo/Uzcard/Visa terminallari orqali, yoki buyurtma vaqtida Click va Payme orqali to&apos;lashingiz mumkin.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Tovarni qaytarish yoki almashtirish mumkinmi?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              O&apos;zbekiston Respublikasi iste&apos;molchilar huquqlarini himoya qilish to&apos;g&apos;risidagi qonuniga muvofiq, foydalanilmagan va qadog&apos;i butun mahsulotlarni 14 kun ichida almashtirish imkoniyati mavjud.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
