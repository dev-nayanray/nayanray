import { useState, useEffect } from "react";
import api from "../services/api";

/* ------------------------------------------------------------------ */
/*  useApi<T> — shared data-fetching hook                              */
/*                                                                    */
/*  Replaces 11+ duplicated useEffect + api.get + useState blocks    */
/*  across the codebase. Each of those blocks was ~10 lines of        */
/*  identical boilerplate: try/catch, loading state, error state,      */
/*  data state. This hook collapses them all into one-liners.        */
/*                                                                    */
/*  Usage:                                                             */
/*    const { data, loading, error } = useApi<Project[]>("/projects"); */
/*    const { data: post } = useApi<BlogPost>(`/blog/${id}`);         */
/*                                                                    */
/*  Features:                                                          */
/*  - Automatic loading state management                              */
/*  - Automatic error state with user-friendly messages               */
/*  - Refetch function for retry buttons                              */
/*  - Skips fetch when URL is null/empty (conditional fetching)      */
/* ------------------------------------------------------------------ */

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  setData: (data: T | null) => void;
}

export function useApi<T>(url: string | null, deps: any[] = []): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    // Skip fetch if URL is null or empty (conditional fetching)
    if (!url) {
      setLoading(false);
      setData(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const response = await api.get(url);
        if (!cancelled) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          // Extract error message without `as any`
          let msg = "Failed to load data";
          if (err && typeof err === "object" && "response" in err) {
            const resp = err as { response?: { data?: { error?: string } } };
            if (resp.response?.data?.error) msg = resp.response.data.error;
          } else if (err instanceof Error) {
            msg = err.message;
          }
          setError(msg);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refetchTrigger, ...deps]);

  const refetch = () => setRefetchTrigger((n) => n + 1);

  return { data, loading, error, refetch, setData };
}
