
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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  onSale?: boolean;
  salePrice?: number;
  discountPercentage?: number;
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

export interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minPurchase?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
  status: 'active' | 'expired' | 'scheduled' | 'inactive';
  products?: string[]; // Product IDs this promotion applies to
  collections?: string[]; // Collection IDs this promotion applies to
  description?: string;
}

export interface SalesReport {
  period: string;
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
  topProducts: {
    productId: string;
    title: string;
    units: number;
    revenue: number;
  }[];
  revenueBySalesChannel: {
    channel: string;
    revenue: number;
  }[];
}

export interface Newsletter {
  id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  source?: string;
}
