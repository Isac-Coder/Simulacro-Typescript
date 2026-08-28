export interface Category{
    id:string,
    name:string,
    description:string | null,
    createAt:string,
    updateAt:string
}

export interface CreateCategoryDto{
    name:string,
    description?:string
}

export interface UpdateCategoryDto{
    name?:string,
    description?:string
}