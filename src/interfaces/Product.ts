import type { category_id } from "./Category";

export interface products{
    id:string,
    name:string,
    description?:string,
    price:number,
    stock:number,
    category_id:category_id,
    created_at:string,
    update_at:string
}