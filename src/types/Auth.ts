import type { User } from "./User";

export interface AuthResponse{
    accesToken:string,
    user:User
}

export interface LoginDto{
    email:string,
    password:string
}

export interface RegistoDto{
    name:string,
    email:string,
    password:string
}