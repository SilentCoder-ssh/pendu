import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [UnoCSS()],

});
