import type { Product } from "./Product";

export interface Favorite{
    id:string,
    userId:string,
    productId:Product,
    createAt:string
}