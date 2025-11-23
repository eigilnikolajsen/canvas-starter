import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsConfigPaths from "vite-tsconfig-paths";

// oxlint-disable no-default-export

export default defineConfig({
	plugins: [solid(), tailwindcss(), tsConfigPaths()],
	server: { port: 3191 },
});
