import * as zod from "zod";

export type ResourceOptions<Data> = {
  url: string;
  schema: zod.Schema<Data>;
};

export type Resource<Data> =
  | { status: "pending" }
  | { status: "resolved"; data: Data }
  | { status: "rejected"; error: unknown };

export function createResource<Data>(
  options: ResourceOptions<Data>,
  onChange: (resource: Resource<Data>) => void
): void {
  let state: Resource<Data> = { status: "pending" };
  onChange(state);
  fetch(options.url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      const parsed = options.schema.parse(data);
      state = { status: "resolved", data: parsed };
      onChange(state);
    })
    .catch((error) => {
      state = { status: "rejected", error };
      onChange(state);
    });
}
