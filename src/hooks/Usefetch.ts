import { useCallback, useEffect, useState } from "react";
import { request } from "../services/Request";
import { errorMessage } from "../services/Errors";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(path: string | null){
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: !!path,
        error:null,
    });

    const fetchData = useCallback(async () =>{
        if (!path) {
            setState({ data: null, loading: false, error: null });
            return;
        }

    setState({data: null, loading: true, error: null });

    try {
        const data = await request<T>(path);
        setState({data, loading: false, error: null });
        } catch (err) {
            setState({data: null, loading: false, error: errorMessage(err) });
        }
    }, [path]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { ...state, refetch: fetchData };
}