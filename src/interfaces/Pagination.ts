export interface respuesta<T>{
    data:T[],
    total:number,
    page:string,
    limit:number,
    totalPages:number
}