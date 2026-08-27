export class ApiError extends Error{
    statusCode: number;
    details?: string | string[];

    constructor(message: string, statusCode: number, details?: string | string[]){
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.details = details;
    }
}

export class NetworkError extends Error{
    constructor(message = 'No se pudo conectar con el servidor, Verifica tu conexión.')
    {
        super(message)
        this.name = 'NetworkError'
    }
}

export function errorMessage(err: unknown): string{
    if (err instanceof NetworkError) return err.message;

    if (err instanceof ApiError) {
        if (err.statusCode === 401) return 'Debes iniciar sesión.';
        if (err.statusCode === 403) return 'No tienes permisos para hacer eso.'
        if (err.statusCode === 404) return 'No se encontró lo que buscabas.';
        if (err.statusCode === 400){
            return Array.isArray(err.details) ? err.details.join('') : err.message;
        }
        return err.message;
    }

    return 'Ocurrió un error inesperado. Intenta de nuevo.';
}