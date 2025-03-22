
export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  soldOut?: boolean;
  collection: string;
  slug: string;
  description?: string;
  variants?: ProductVariant[];
  stock?: number;
  inStock?: boolean;
  lowStock?: boolean; // For indicating low stock
  images?: string[];
  features?: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price?: number;
  image?: string;
  attributes: ProductAttribute[];
  stock: number;
  inStock?: boolean;
  lowStock?: boolean;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: ProductAttribute[];
}

export interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  addedAt: string;
  slug: string;
}
