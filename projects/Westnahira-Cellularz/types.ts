export interface Product {
  _id?: string;
  id?: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images?: string[];
  category: string;
  description: string;
  shortDescription?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  whatIncluded?: string[];
  warranty?: string;
  availability?: string;
  sku?: string;
  weight?: string;
  dimensions?: string;
  colors?: string[];
  selectedColor?: string;
  rating: number;
  reviews: number;
  stock?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  googleId?: string;
  createdAt: string;
}

export interface MegaMenuCategory {
  title: string;
  links: { name: string; href: string }[];
}

export interface Category {
  name: string;
  imageUrl: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}
