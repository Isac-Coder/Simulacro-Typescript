import type { User } from "./User"

export interface AuthResponse{
    accessToken: string, 
    user: User
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}
