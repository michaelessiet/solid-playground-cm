import { Component, createEffect, createSignal } from "solid-js";
import * as SolidWeb from 'solid-js/web'

import Console from "./components/console";
import { Editor } from "solid-playground-editor-cm";
import { createStore } from "solid-js/store";
import execute from "./utils/execute";
import Logger, { originalLog } from "./utils/logger";

const App: Component = () => {
  const [fileName, setFileName] = createSignal("file.ts");
  const [files, setFiles] = createStore({
    "file.ts": " ",
    "file2.ts": " ",
  });
  const logger = new Logger();
  const [logs, setLogs] = createSignal<Logger["logs"]>([]);

  function runCode(code: string) {
    console.log = logger.log;
    console.warn = logger.warn;
    console.error = logger.error;
    console.info = logger.info;

    const func = new Function(code);
    func();
    originalLog(JSON.stringify(logger.logs));
  }

  createEffect(() => {
    logger.clear();
    const code = execute(
      // fileName(),
      // Object.entries(files).map(([name, code]) => ({ name, code })),
      files[fileName()],
      {
        'solid-js/web': SolidWeb,
        ...files
      },
      fileName(),
      files
    );

    runCode(code);
    setLogs(logger.logs);
  });

  return (
    <div class='container'>
      <div class="playground-container">
        <Editor
          fileName={fileName()}
          files={files}
          setFileName={setFileName}
          setFiles={setFiles}
        />
        <Console logs={logs} />
      </div>
      <div class="output"></div>
    </div>
  );
};

export default App;
