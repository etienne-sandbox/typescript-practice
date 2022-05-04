import { useState, useEffect } from "react";

export type Resource<Data> =
  | { status: "loading" }
  | { status: "success"; data: Data }
  | { status: "error"; error: any };

export function useFetch<Data>(url: string): Resource<Data> {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => controller.abort();
  }, []);

  return data;
}
