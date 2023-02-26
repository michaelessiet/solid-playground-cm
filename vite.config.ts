import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import nodePolyfills from 'vite-plugin-node-polyfills'

export default defineConfig((env) => ({
  plugins: [solidPlugin(),nodePolyfills.nodePolyfills()],
  define: {
    "process.env.BABEL_TYPES_8_BREAKING": "true",
    "process.env.NODE_DEBUG": "false",
    ...(env.command == "build" ? {} : { global: "globalThis" }),
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    include: ["@babel/types"],
  },
}));
