export class ApiError extends Error{
    statusCode: number,
    details?:

    constructor(

    )
}

export class NetworkError extends Error{
    constructor(message = 'No se pudo conectar con el servidor, Verifica tu conexión.')
    {
        super(message)
        this.name = 'NetworkError'
    }
}