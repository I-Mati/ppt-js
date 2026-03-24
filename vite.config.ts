import { defineConfig } from "vite";

export default defineConfig({
  base: "", // Cambiar por el nombre del repo si no es dominio propio, ej: "/repo-name/"
  build: {
    outDir: "dist",
  },
});
