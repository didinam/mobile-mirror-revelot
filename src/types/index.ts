
export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  soldOut?: boolean;
  collection: string;
  slug: string;
}
