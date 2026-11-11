import productsData from "@/data/products.json";
import { Product, SortOption } from "@/types";

export function getAllProducts(): Product[] {
  return productsData as unknown as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export function getDiscountedProducts(limit = 8): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isDiscounted).slice(0, limit);
}

export function getNewProducts(limit = 8): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.categorySlug.toLowerCase() === categorySlug.toLowerCase());
}

export function getRelatedProducts(productId: string, categorySlug: string, limit = 4): Product[] {
  const products = getAllProducts();
  return products
    .filter((p) => p.id !== productId && p.categorySlug === categorySlug)
    .slice(0, limit);
}

export interface FilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: SortOption;
  onlyDiscounted?: boolean;
}

export function filterProducts({
  category,
  minPrice,
  maxPrice,
  search,
  sort = "mashhur",
  onlyDiscounted,
}: FilterParams): Product[] {
  let result = getAllProducts();

  if (category && category !== "all") {
    result = result.filter(
      (p) => p.categorySlug.toLowerCase() === category.toLowerCase()
    );
  }

  if (search && search.trim() !== "") {
    const q = search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (minPrice !== undefined && !isNaN(minPrice)) {
    result = result.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    result = result.filter((p) => p.price <= maxPrice);
  }

  if (onlyDiscounted) {
    result = result.filter((p) => p.isDiscounted);
  }

  // Sorting
  switch (sort) {
    case "arzon":
      result.sort((a, b) => a.price - b.price);
      break;
    case "qimmat":
      result.sort((a, b) => b.price - a.price);
      break;
    case "yangi":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "mashhur":
    default:
      result.sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount);
      break;
  }

  return result;
}
