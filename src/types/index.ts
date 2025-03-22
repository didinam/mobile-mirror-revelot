
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
}

export interface ProductVariant {
  id: string;
  title: string;
  price?: number;
  image?: string;
  attributes: ProductAttribute[];
  stock: number;
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

