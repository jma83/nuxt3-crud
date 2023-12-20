import { alias } from "./alias";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  root: ".",
  esbuild: {
    tsconfigRaw: "{}",
  },
  resolve: {
    alias,
  },
  test: {
    global: true,
    environment: "happy-dom",
  },
});
