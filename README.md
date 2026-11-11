# TexnoDokon — Zamonaviy Elektronika va Texnika Do'koni

O'zbekiston bozori uchun maxsus ishlab chiqilgan, zamonaviy, to'liq moslashuvchan (responsive) va yuqori tezlikda ishlovchi elektronika internet-do'koni veb-sayti.

![TexnoDokon Banner](https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Loyiha haqida

**TexnoDokon** — Next.js 14 (App Router), TypeScript va Tailwind CSS texnologiyalari asosida yaratilgan e-commerce platformasi. Saytda tashqi ma'lumotlar bazasisiz (`/data/products.json` orqali) 26 dan ortiq original mahsulotlar katalogi, qulay savat boshqaruvi (React Context + localStorage) va buyurtmalarni to'g'ridan-to'g'ri Telegram messenjeri orqali qabul qilish imkoniyati mavjud.

Barcha matnlar va interfeys elementlari o'zbek tilida (lotin alifbosida), narxlar esa so'm (UZS) formatida taqdim etilgan.

---

## ✨ Asosiy Xususiyatlar

- **🎨 Zamonaviy Dizayn:** To'liq moslashuvchan (mobile-first), qorong'i va yorug' rejim (Dark/Light mode) tugmasi bilan.
- **⚡ Yuqori Tezlik:** Next.js 14 App Router va Server-Side Generation (SSG) orqali lahzali yuklanish.
- **🔍 Qidiruv va Filtrlash:**
  - 7 ta asosiy kategoriya (Smartfonlar, Noutbuklar, Planshetlar, Quloqchinlar, Soatlar, Aksessuarlar, Maishiy texnika).
  - Narx oralig'i (minimal / maksimal) bo'yicha saralash.
  - Saralash turlari: Ommaboplik, narx (arzon/qimmat), eng yangilar.
  - Chegirmadagi tovarlar uchun maxsus filtr.
- **🛍 Savat (Cart) Tizimi:**
  - React Context API va `localStorage` bilan sinxronizatsiya.
  - Mahsulot sonini oshirish, kamaytirish va o'chirish.
  - Tovarni savatga qo'shganda paydo bo'luvchi interaktiv bildirishnoma (Toast).
  - Promokod qo'llash imkoniyati (`TEXNO`).
- **📱 Telegram orqali Buyurtma Berish:**
  - `+998` formatidagi telefon raqami tekshiruvi.
  - Viloyat va aniq manzil kiritish formasi.
  - Buyurtma ro'yxati, soni, narxi va manzili bilan tayyor Telegram havolasini shakllantirish (`t.me/USERNAME?text=...`).
- **🛡 SEO va Foydalanish Qulayligi (Accessibility):**
  - Har bir sahifa uchun moslashtirilgan meta teglar va OpenGraph ma'lumotlari.
  - `robots.txt` va `sitemap.xml` integratsiyasi.
  - Skrinriderlar va klaviatura bilan boshqarish uchun to'liq moslangan.

---

## 🛠 Texnologiyalar To'plami (Tech Stack)

- **Freymvork:** [Next.js 14](https://nextjs.org/) (App Router, SSG)
- **Til:** [TypeScript](https://www.typescriptlang.org/)
- **Stillar:** [Tailwind CSS](https://tailwindcss.com/)
- **Belgilar (Icons):** [Lucide React](https://lucide.dev/)
- **Rejim Boshqaruvi:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Holat Boshqaruvi:** React Context API + LocalStorage
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 📁 Loyiha Tuzilmasi (Folder Structure)

```text
texnodokon/
├── .github/
│   └── workflows/
│       └── ci.yml               # Avtomatlashtirilgan lint va build tekshiruvi
├── app/
│   ├── aloqa/
│   │   └── page.tsx             # Bog'lanish va FAQ sahifasi
│   ├── buyurtma/
│   │   └── page.tsx             # Buyurtma rasmiylashtirish (Checkout)
│   ├── katalog/
│   │   └── page.tsx             # Katalog va filtrlash sahifasi
│   ├── mahsulot/
│   │   └── [slug]/
│   │       └── page.tsx         # Mahsulotning batafsil sahifasi
│   ├── savat/
│   │   └── page.tsx             # Savat sahifasi
│   ├── globals.css              # Asosiy stillar
│   ├── layout.tsx               # Asosiy tartib (Header, Footer, Providers)
│   ├── not-found.tsx            # Maxsus 404 xatolik sahifasi
│   └── page.tsx                 # Bosh sahifa (Home)
├── components/
│   ├── CategoryGrid.tsx         # Kategoriyalar tarmog'i
│   ├── CartToast.tsx            # Savatga qo'shildi bildirishnomasi
│   ├── CatalogView.tsx          # Interaktiv katalog komponenti
│   ├── Footer.tsx               # Saytning quyi qismi
│   ├── Header.tsx               # Yopishqoq bosh qism (Sticky header)
│   ├── HeroBanner.tsx           # Bosh sahifa slayderi (Carousel)
│   ├── ProductCard.tsx          # Mahsulot kartochkasi
│   ├── ProductDetailClient.tsx  # Mahsulot sahifasining interaktiv qismi
│   ├── ProductSkeleton.tsx      # Yuklanish animatsiyasi (Skeleton)
│   ├── ThemeProvider.tsx        # Qorong'i/Yorug' rejim provayderi
│   └── ThemeToggle.tsx          # Rejimni o'zgartirish tugmasi
├── context/
│   └── CartContext.tsx          # Savat holati konteksti
├── data/
│   └── products.json            # 26 ta mahsulot ma'lumotlar bazasi
├── lib/
│   ├── products.ts              # Mahsulotlarni qidirish va filtrlash
│   └── utils.ts                 # Narx va telefon formatlash yordamchilari
├── public/
│   ├── robots.txt               # Qidiruv botlari ko'rsatmasi
│   └── sitemap.xml              # Sayt xaritasi
├── types/
│   └── index.ts                 # TypeScript interfeyslari
├── .env.example                 # Muhit o'zgaruvchilari namunasi
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 💻 O'rnatish va Ishga Tushirish

### 1. Repozitoriyani yuklab oling yoki oching:
```bash
git clone <repo-url>
cd texnodokon
```

### 2. Kerakli paketlarni o'rnating:
```bash
npm install
```

### 3. Muhit o'zgaruvchilarini sozlang:
`.env.example` faylidan nusxa olib `.env.local` yarating:
```bash
cp .env.example .env.local
```
Fayl ichidagi Telegram foydalanuvchi nomini o'zingiznikiga moslashtiring:
```env
NEXT_PUBLIC_TELEGRAM_USERNAME=texnodokon_uz
NEXT_PUBLIC_PHONE=+998 71 200 00 00
```

### 4. Dasturni ishga tushiring:
```bash
npm run dev
```
Brauzerda [http://localhost:3000](http://localhost:3000) manzilini oching.

### 5. Ishlab chiqarish versiyasini yig'ish (Production Build):
```bash
npm run build
npm run start
```

---

## 🌐 Vercel-ga Joylashtirish (Deployment)

Loyiha Vercel platformasiga hech qanday qo'shimcha konfiguratsiyasiz to'g'ridan-to'g'ri o'rnatiladi:

1. [Vercel](https://vercel.com) saytiga kiring.
2. **"Add New Project"** tugmasini bosing va GitHub repozitoriyangizni tanlang.
3. **Environment Variables** bo'limida quyidagilarni kiriting:
   - `NEXT_PUBLIC_TELEGRAM_USERNAME`: Sizning telegram bot yoki profilingiz
   - `NEXT_PUBLIC_PHONE`: Aloqa telefon raqami
4. **Deploy** tugmasini bosing. 1 daqiqa ichida veb-saytingiz butun dunyo uchun jonli ishga tushadi!

---

## 📄 Litsenziya

Loyiha [MIT](LICENSE) litsenziyasi ostida taqdim etiladi.
