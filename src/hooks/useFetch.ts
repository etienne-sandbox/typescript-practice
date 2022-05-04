import { useState, useEffect } from "react";

export function useFetch<Data>(url: string): Data | null {
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
