import { transform } from "@babel/standalone";
// @ts-ignore
import babelPresetSolid from "babel-preset-solid";
// import transformEs2015ModulesCommonjs from "babel-plugin-transform-es2015-modules-commonjs";

export function transpile(code: string, filename: string) {
  return transform(code, {
    presets: [
      ["es2015", { modules: 'commonjs' }],
      ["typescript", { onlyRemoveTypeImports: true }],
      [babelPresetSolid, { generate: "dom", hydratable: false }],
    ],
    filename: filename,
  }).code;
}
