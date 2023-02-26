import { transform } from "@babel/standalone";
// @ts-ignore
import babelPresetSolid from "babel-preset-solid";
// import transformEs2015ModulesCommonjs from "babel-plugin-transform-es2015-modules-commonjs";

export function transpile(code: string, filename: string) {
  return transform(code, {
    presets: [
      "env",
      babelPresetSolid,
      ["es2015", { modules: 'commonjs' }],
      ["typescript", { onlyRemoveTypeImports: true }],
    ],
    filename: filename,
  }).code;
}
