import type { Category } from "./Category";

export interface ProductImage{
    id:string,
    url:string,
    order:number
}

export interface Product{
    id:string,
    name:string,
    description?:string|null,
    price:number,
    stock:number,
    categoryId:string,
    category:Category,
    images:ProductImage[],
    create_at:string,
    update_at:string
}

export interface CreateProductDto{
    name?:string,
    categoryId?:string,
    page?:number,
    limit?:number
}

export interface PaginatedResponse<T>{
    date:T[],
    total: number,
    page:number,
    limit:number,
    totalPage:number
}