import { Suspense } from "react";
import { Metadata } from "next";
import { CatalogView } from "@/components/CatalogView";
import { getAllProducts } from "@/lib/products";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";

export const metadata: Metadata = {
  title: "Mahsulotlar katalogi | TexnoDokon",
  description:
    "O'zbekistonda eng so'nggi rusumdagi smartfonlar, noutbuklar, planshetlar, soatlar va aksessuarlar arzon narxlarda va rasmiy kafolat bilan.",
};

export default function CatalogPage() {
  const products = getAllProducts();

  return (
    <Suspense
      fallback={
        <div className="py-10">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-48 mb-6 animate-pulse" />
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <CatalogView initialProducts={products} />
    </Suspense>
  );
}
