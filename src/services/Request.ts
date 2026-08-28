import { ApiError, NetworkError } from "./Errors";
import { tokenStorage } from "./TokenStorage";

const BASE_URL = 'http://localhost:3000';

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = tokenStorage.get();

    let response: Response;
    try {
        response = await fetch(BASE_URL + path, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}`} : {}),
                ...options.headers
            },
        });
    } catch {
        throw new NetworkError();
    }

    if (response.status === 401) {
        tokenStorage.clear();
        window.dispatchEvent(new Event('auth:unauthorized'));
    }

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
        throw new ApiError(message ?? `Error ${response.status}`, response.status, body?.message)
    }

    if (response.status === 204) return undefined as T;
    return response.json();

}
