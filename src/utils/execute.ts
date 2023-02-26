import { transpile } from "./transpiler";

interface File {
  name: string;
  code: string;
}

function formatModule(filename: string, code: string) {
  return {
    filename: filename,
    func:  new Function('exports','require', transpile(code,filename)!),
    exports: {},
  };
}

export default function executeCode(
  codeString: string,
  dependencies: Record<string, unknown>,
  activeFile: string,
  files: { [key: string]: string }
) {
  const transformedCode = transpile(codeString, activeFile);
  const modules = [...Object.entries(files).map((val) => formatModule(val[0], val[1]))]

  const deps = { ...dependencies, ...files };
  const exports: Record<string, unknown> = {};
  const require = (path: string) => {
    const module = modules.find((val) => val.filename === path)

    if (typeof deps[path] === 'string') {
      module?.func(module.exports, require)
      return module?.exports
    }

    if (deps[path]) {
      return deps[path];
    }
    throw Error(`Module not found: ${path}.`);
  };
  const result = new Function("exports", "require", transformedCode!);

  result(exports, require);

  return exports.default;
}
