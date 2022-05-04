import { useState, useEffect, useCallback } from "react";

export type Resource<Data> =
  | { status: "loading" }
  | { status: "success"; data: Data; refreshing: boolean }
  | { status: "error"; error: any };

export function useFetch<Data>(url: string): [Resource<Data>, () => void] {
  const [resource, setResource] = useState<Resource<Data>>({
    status: "loading",
  });
  const [refreshId, setRefreshId] = useState(0);

  const refresh = useCallback(() => {
    setRefreshId((p) => p + 1);
  }, []);

  useEffect(() => {
    setResource((prev) => {
      if (prev.status === "success") {
        return {
          ...prev,
          refreshing: true,
        };
      }
      return prev;
    });

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        setResource({ status: "success", data, refreshing: false });
      } catch (error) {
        setResource({ status: "error", error });
      }
    })();

    return () => controller.abort();
  }, [refreshId]);

  return [resource, refresh];
}
