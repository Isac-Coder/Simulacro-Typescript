import type { Category } from "./Category";

export interface ProductImage {
  id: string;
  url: string;
  order: number;
}
 
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  categoryId: string;
  category: Category; 
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}
 
export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  images?: string[];
}
 
export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  images?: string[];
}
 
export interface QueryProductParams {
  search?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}
 
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}