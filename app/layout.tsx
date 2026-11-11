import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartToast } from "@/components/CartToast";

export const metadata: Metadata = {
  metadataBase: new URL("https://texnodokon.uz"),
  title: {
    default: "TexnoDokon — O'zbekistonda texnika va elektronika do'koni",
    template: "%s | TexnoDokon",
  },
  description:
    "Smartfonlar, noutbuklar, planshetlar, quloqchinlar va maishiy texnikalarni arzon narxlarda rasmiy kafolat bilan xarid qiling. Toshkent va butun O'zbekiston bo'ylab bepul tezkor yetkazib berish.",
  keywords: [
    "texnodokon",
    "telefonlar",
    "noutbuklar",
    "uzbekistan",
    "toshkent texnika",
    "iphone 15 narxi",
    "macbook sotib olish",
    "maishiy texnika",
    "samsung narxlari",
  ],
  authors: [{ name: "TexnoDokon" }],
  openGraph: {
    title: "TexnoDokon — O'zbekistonda zamonaviy texnika do'koni",
    description:
      "Eng so'nggi gadjetlar va maishiy texnikalarni rasmiy kafolat bilan xarid qiling.",
    url: "https://texnodokon.uz",
    siteName: "TexnoDokon",
    locale: "uz_UZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 antialiased transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Header />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
            <CartToast />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
