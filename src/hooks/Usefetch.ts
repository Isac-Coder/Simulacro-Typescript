import { useCallback, useEffect, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import { api } from "../services/Instance";
import { ApiError, NetworkError } from "../services/Errors";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(url: string | null, params?: AxiosRequestConfig['params']) {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: !!url,
        error: null,
    });
    
    const paramsKey = JSON.stringify(params ?? {});
    
    const fetchData = useCallback(async () => {
        if (!url) {
        setState({ data: null, loading: false, error: null });
        return;
    }
    
    setState((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
        const response = await api.get<T>(url, { params });
        setState({ data: response.data, loading: false, error: null });
    } catch (err) {
        let message = 'Ocurrió un error inesperado. Intenta de nuevo.';
    
        if (err instanceof NetworkError) {
            message = err.message;
        } else if (err instanceof ApiError) {
            if (err.statusCode === 401 || err.statusCode === 403) {
            message = 'No tienes permisos para ver este contenido.';
            } else if (err.statusCode === 400) {
            message = Array.isArray(err.details) ? err.details.join(' ') : err.message;
            } else if (err.statusCode === 404) {
            message = 'No se encontró lo que buscabas.';
            } else {
            message = err.message;
            }
        }
    
        setState({ data: null, loading: false, error: message });
    }
    }, [url, paramsKey]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    return { ...state, refetch: fetchData };
}
