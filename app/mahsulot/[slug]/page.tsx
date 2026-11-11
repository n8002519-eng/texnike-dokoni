import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle2, Shield, Info } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { ProductCard } from "@/components/ProductCard";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Mahsulot topilmadi | TexnoDokon",
    };
  }

  return {
    title: `${product.name} - narxi, xususiyatlari | TexnoDokon`,
    description: product.description,
    openGraph: {
      title: `${product.name} | TexnoDokon`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.categorySlug, 4);

  return (
    <div className="py-6 sm:py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400 overflow-x-auto pb-1"
      >
        <Link href="/" className="hover:text-blue-600 transition-colors whitespace-nowrap">
          Bosh sahifa
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        <Link href="/katalog" className="hover:text-blue-600 transition-colors whitespace-nowrap">
          Katalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        <Link
          href={`/katalog?kategoriya=${product.categorySlug}`}
          className="hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-slate-900 dark:text-white truncate max-w-xs font-semibold">
          {product.name}
        </span>
      </nav>

      {/* Main product view (Gallery + Add to cart) */}
      <ProductDetailClient product={product} />

      {/* Tabs / Detailed Specs & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-200/80 dark:border-slate-800">
        {/* Technical Specs Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>Texnik xususiyatlari</span>
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {Object.entries(product.specs).map(([specKey, specValue]) => (
                <div
                  key={specKey}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm"
                >
                  <span className="text-slate-500 dark:text-slate-400 font-medium sm:w-1/3">
                    {specKey}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold sm:w-2/3 text-left sm:text-right">
                    {specValue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Mahsulot tavsifi
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Side Info / Trust Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800/80 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>TexnoDokon kafolati</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>100% asl va sertifikatlangan tovar</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Tekshirib, keyin to&apos;lov qilish imkoniyati</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>O&apos;zbekistonning barcha viloyatlariga kuryerlik xizmati</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Rasmiy servis markazlarida bepul xizmat ko&apos;rsatish</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              O&apos;xshash mahsulotlar
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Shu toifadagi boshqa mashhur variantlar
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
