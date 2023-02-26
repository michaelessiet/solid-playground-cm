import solid from "solid-start/vite";
import { defineConfig } from "vite";
//@ts-ignore
import solidStatic from 'solid-start-static'

export default defineConfig({
  base:'/solid-playground-cm/',
  //@ts-ignore
  plugins: [solid({ adapter: solidStatic() })],
});
