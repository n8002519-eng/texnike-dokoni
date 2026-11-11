import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Narxni so'm formatida qaytaradi: "12 500 000 so'm"
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount)) return "0 so'm";
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} so'm`;
}

/**
 * Telefon raqamini formatlash: +998 (XX) XXX-XX-XX
 */
export function formatUzbekPhone(value: string): string {
  // Faqat raqamlarni olamiz
  const numbers = value.replace(/\D/g, "");
  
  // Agar 998 bilan boshlansa, uni saqlaymiz yoki avtomatik qo'shamiz
  let cleaned = numbers;
  if (cleaned.startsWith("998")) {
    cleaned = cleaned.slice(3);
  }
  
  // Maksimum 9 ta raqam (operator kodi + raqam)
  cleaned = cleaned.slice(0, 9);
  
  let formatted = "+998";
  if (cleaned.length > 0) {
    formatted += ` (${cleaned.slice(0, 2)}`;
  }
  if (cleaned.length >= 3) {
    formatted += `) ${cleaned.slice(2, 5)}`;
  }
  if (cleaned.length >= 6) {
    formatted += `-${cleaned.slice(5, 7)}`;
  }
  if (cleaned.length >= 8) {
    formatted += `-${cleaned.slice(7, 9)}`;
  }
  
  return formatted;
}

export const CATEGORIES: Category[] = [
  { id: "1", name: "Smartfonlar", slug: "smartfonlar", iconName: "Smartphone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" },
  { id: "2", name: "Noutbuklar", slug: "noutbuklar", iconName: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80" },
  { id: "3", name: "Planshetlar", slug: "planshetlar", iconName: "Tablet", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80" },
  { id: "4", name: "Quloqchinlar", slug: "quloqchinlar", iconName: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
  { id: "5", name: "Soatlar", slug: "soatlar", iconName: "Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
  { id: "6", name: "Aksessuarlar", slug: "aksessuarlar", iconName: "Cable", image: "https://images.unsplash.com/photo-1622445268045-885741b07671?auto=format&fit=crop&w=400&q=80" },
  { id: "7", name: "Maishiy texnika", slug: "maishiy-texnika", iconName: "Home", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=80" },
];
