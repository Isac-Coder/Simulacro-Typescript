import { useState } from 'react';
import type { AxiosRequestConfig, Method } from 'axios';
import { api } from '../services/Instance';
import { ApiError, NetworkError } from '../services/Errors';
 
interface MutationState {
  loading: boolean;
  error: string | null;
}
 
function messageFor(err: unknown): string {
  if (err instanceof NetworkError) return err.message;
 
  if (err instanceof ApiError) {
    if (err.statusCode === 401) return 'Debes iniciar sesión para hacer esto.';
    if (err.statusCode === 403) return 'No tienes permisos para hacer esto.';
    if (err.statusCode === 400) {
      return Array.isArray(err.details) ? err.details.join(' ') : err.message;
    }
    if (err.statusCode === 409) return err.message; // ej: ya está en favoritos
    return err.message;
  }
 
  return 'Ocurrió un error inesperado. Intenta de nuevo.';
}
 
/**
 * Hook genérico para POST/PATCH/DELETE.
 * Se dispara manualmente (ej. onSubmit de un form), no en un useEffect.
 */
export function useMutation<TResponse, TBody = unknown>(method: Method, url: string) {
  const [state, setState] = useState<MutationState>({ loading: false, error: null });
 
  const mutate = async (
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse | null> => {
    setState({ loading: true, error: null });
 
    try {
      const response = await api.request<TResponse>({ method, url, data: body, ...config });
      return response.data;
    } catch (err) {
      setState((prev) => ({ ...prev, error: messageFor(err) }));
      return null;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };
 
  return { mutate, ...state };
}
 