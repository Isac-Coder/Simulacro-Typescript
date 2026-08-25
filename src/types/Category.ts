export interface Category{
    id:string,
    name:string,
    description:string | null,
    create_at:string,
    update_at:string
}

export interface CreateCategoryDto{
    name:string,
    description?:string
}

export interface UpdateCategoryDto{
    name?:string,
    description?:string
}