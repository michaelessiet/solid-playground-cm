import { transform } from "@babel/standalone";
// @ts-ignore
import babelPresetSolid from "babel-preset-solid";
import { originalError } from "./logger";

export function transpile(code: string, filename: string) {
  try {
    return transform(code, {
      presets: [
        "env",
        babelPresetSolid,
        ["es2015", { modules: "commonjs" }],
        ["typescript", { onlyRemoveTypeImports: true }],
      ],
      filename: filename,
    }).code;
  } catch (error) {
    originalError(error);
    return "";
  }
}
