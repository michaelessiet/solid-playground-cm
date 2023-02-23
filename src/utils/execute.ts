// import { transpile } from "typescript";
import { createEffect } from "solid-js";
import Logger from "./logger";
import { transpile } from "./transpiler";

interface File {
  name: string;
  code: string;
}

function formatModule(filename: string, code: string) {
  return `{
    filename: "${filename}",
    func:  function (require, exports) {
      ${transpile(code, filename)}
    },
    exports: {},
  }`;
}

export default function executeCode(
  codeString: string,
  dependencies: Record<string, unknown>,
  activeFile: string,
  files: { [key: string]: string },
) {
  const transformedCode = transpile(codeString, '')
  const deps = {...dependencies, ...files}
  console.log(JSON.stringify(deps, null, 2))
  const exports: Record<string, unknown> = {}
  const require = (path:string) => {
    if (deps[path]) {
      return deps[path]
    }
    throw Error(`Module not found: ${path}.`)
  }
  const result = new Function('exports', 'require', transformedCode!)

  result(exports, require)

  return exports.default
}

// export default function execute(
//   activeFile: string,
//   files: File[],
//   dependencies?: Record<string, any>
// ) {
//   let index = files.findIndex((file) => file.name === activeFile);
//   const formattedFiles = files.map((file) =>
//     formatModule(file.name, file.code)
//   );

//   try {
//     const code = `
//     const imported = [];
//     let index = ${index};
//     const dependencies = ${dependencies ? JSON.stringify(dependencies) : "{}"};
//     console.log(JSON.stringify(dependencies, null, 2));
//     const modules = [${formattedFiles.join(",")}];
//     const require = function(file) {
//       const module = modules.find(({ filename }) => filename === file);
//       let dependency = {}

//       if (!module) {
//         dependency = dependencies[file];
//         if (!dependency) {
//           throw new Error('Can not find "' + file + '" file.');
//         }
//       }

//       imported.push(file);
//       module.func(require, module.exports);

//       const exports = {...module.exports, ...dependency};

//       // return module.exports;
//       return exports;
//     };
//     modules[index].func(require, modules[index].exports);
//   `;

//     return {
//       code: transpile(code, activeFile),
//       activeFile,
//     };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
