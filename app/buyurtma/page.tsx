"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Send,
  Phone,
  User,
  MapPin,
  CreditCard,
  Banknote,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, formatUzbekPhone } from "@/lib/utils";

const REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand viloyati",
  "Andijon viloyati",
  "Farg'ona viloyati",
  "Namangan viloyati",
  "Buxoro viloyati",
  "Navoiy viloyati",
  "Qashqadaryo viloyati",
  "Surxondaryo viloyati",
  "Xorazm viloyati",
  "Jizzax viloyati",
  "Sirdaryo viloyati",
  "Qoraqalpog'iston Respublikasi",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [region, setRegion] = useState("Toshkent shahri");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "click_payme">(
    "cash"
  );
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState("");

  const telegramUsername =
    process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "texnodokon_uz";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzbekPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || phone.trim().length < 14 || !address.trim()) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    setIsSubmitting(true);

    // Build order items text
    const itemsText = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.product.name}${
            item.selectedColor ? ` (${item.selectedColor})` : ""
          } — ${item.quantity} dona x ${formatPrice(item.product.price)}`
      )
      .join("\n");

    const paymentText =
      paymentMethod === "cash"
        ? "Yetkazib berganda to'lash (Naqd / Karta)"
        : "Click / Payme orqali to'lov";

    // Build the formatted Uzbek order message
    const orderMessage = `🛒 YANGI BUYURTMA — TexnoDokon

👤 Mijoz: ${fullName.trim()}
📞 Telefon: ${phone.trim()}
📍 Hudud: ${region}
🏠 Manzil: ${address.trim()}
💳 To'lov turi: ${paymentText}
${notes.trim() ? `📝 Izoh: ${notes.trim()}\n` : ""}
📦 Buyurtma tarkibi:
${itemsText}

💰 Jami to'lov: ${formatPrice(totalPrice)}
🚚 Yetkazib berish: Bepul
⏱ Vaqt: ${new Date().toLocaleString("uz-UZ")}`;

    const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
      orderMessage
    )}`;
    setTelegramUrl(url);

    // Open Telegram in a new window or tab
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }

    // Set success and clear cart
    setIsSuccess(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="py-16 sm:py-24 text-center max-w-lg mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-in zoom-in">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Buyurtmangiz qabul qilindi!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Buyurtma tafsilotlari Telegram orqali operatorimizga yo&apos;naltirildi. Tez orada menejerimiz siz bilan bog&apos;lanadi.
          </p>
        </div>

        {telegramUrl && (
          <div className="pt-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegramda buyurtmani ko&apos;rish</span>
            </a>
          </div>
        )}

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bosh sahifaga qaytish</span>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Savatda mahsulot yo&apos;q
        </h2>
        <p className="text-sm text-slate-500">
          Buyurtma berish uchun avval tovarlarni savatga qo&apos;shing.
        </p>
        <Link
          href="/katalog"
          className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          Katalogga o&apos;tish
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/savat"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Savatga qaytish</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Buyurtmani rasmiylashtirish
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Ma&apos;lumotlaringizni kiriting va Telegram orqali bir bosishda buyurtma bering
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form details (Left) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Buyer Contact details */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>1. Aloqa ma&apos;lumotlari</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Ism va Familiya <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Masalan: Sardor Rahimov"
                      className="w-full pl-9 pr-3 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Telefon raqam <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+998 (90) 123-45-67"
                      className="w-full pl-9 pr-3 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery address details */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>2. Yetkazib berish manzili</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Shahar / Viloyat <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
                  >
                    {REGIONS.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Aniq manzil (tuman, ko&apos;cha, uy, xonadon) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Chilonzor tumani, 9-mavze, 14-uy, 22-xonadon"
                      className="w-full pl-9 pr-3 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Yetkazib beruvchi uchun izoh (ixtiyoriy)
                  </label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Masalan: Soat 18:00 dan keyin yetkazilsin, domofon kodi: 123"
                      className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>3. To&apos;lov usuli</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === "cash"
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Qabul qilganda to&apos;lash
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Tovarni ko&apos;rib tekshirgandan so&apos;ng naqd yoki karta orqali
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("click_payme")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === "click_payme"
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Click / Payme
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Karta orqali masofadan xavfsiz to&apos;lov qilish
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 sticky top-28">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Sizning buyurtmangiz
              </h3>

              {/* Items preview */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor || "d"}`}
                    className="py-3 flex items-center gap-3 text-xs"
                  >
                    <div className="relative w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-slate-400">
                        {item.quantity} x {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Yetkazib berish:</span>
                  <span className="text-emerald-600 font-semibold">Bepul</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Jami:
                  </span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Telegram Submit Button */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>Telegram orqali buyurtma berish</span>
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  Tugmani bosganingizda buyurtma tafsilotlari bilan Telegram chat ochiladi.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Operatorimiz Telegram orqali 5 daqiqa ichida buyurtmangizni tasdiqlaydi.
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
