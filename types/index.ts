export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  isDiscounted: boolean;
  isFeatured: boolean;
  isNew: boolean;
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: string;
  description: string;
  images: string[];
  colors?: string[];
  specs: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  productCount?: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface OrderData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cash' | 'card' | 'click_payme';
  notes?: string;
}

export type SortOption = 'mashhur' | 'arzon' | 'qimmat' | 'yangi';
