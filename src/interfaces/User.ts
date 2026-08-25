type UserRole = 'admin' | 'user'


export interface User{
    id:string,
    name:string,
    email:string,
    password:string
    create_at:string,
    update_at:string
    role: UserRole
}