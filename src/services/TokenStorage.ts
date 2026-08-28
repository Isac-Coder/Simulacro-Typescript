const TOKEN_KEY = 'accesToken'

export const tokenStorage = {
    get(): string|null{
        return localStorage.getItem(TOKEN_KEY);
    },
    set(token:string, persistent:boolean): void{
        const storage = persistent ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEY, token)
    },
    clear(): void{
        localStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(TOKEN_KEY)
    }
}