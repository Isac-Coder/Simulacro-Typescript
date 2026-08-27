import { useState } from "react";
import { request } from "../services/Request";
import { errorMessage } from "../services/Errors";

interface MutationState {
    loading: boolean;
    error: string | null;
}

export function useMutation<TResponse, TBody = unknown>(method: string, path: string) {
    const [state, setState] = useState<MutationState>({ loading: false, error: null });
    
    const mutate = async (body?: TBody): Promise<TResponse | null> => {
        setState({ loading: true, error: null });
    
        try {
        const data = await request<TResponse>(path, {
            method,
            body: body ? JSON.stringify(body) : undefined,
        });
        return data;
        } catch (err) {
        setState((prev) => ({ ...prev, error: errorMessage(err) }));
        return null;
        } finally {
        setState((prev) => ({ ...prev, loading: false }));
        }
    };
    
    return { mutate, ...state };
}