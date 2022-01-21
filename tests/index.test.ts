import { createResource } from "../src/resource";

test("createResource should throw without params", () => {
  expect(() => (createResource as any)()).toThrow();
});
