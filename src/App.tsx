import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import * as SolidWeb from "solid-js/web";
import * as Solidjs from "solid-js";
import './index.css'

import Console from "./components/console";
import { Editor } from "solid-playground-editor-cm";
import { createStore } from "solid-js/store";
import execute from "./utils/execute";
import Logger, { originalLog } from "./utils/logger";

const App: Component = () => {
  const [fileName, setFileName] = createSignal("index.tsx");
  const [files, setFiles] = createStore({
    "index.tsx": `import {render} from 'solid-js/web'
import App from 'App.tsx'
const output = document.querySelector('.output')

render(() => <App/>, output)`,
    "App.tsx": `export default function App() {
  return <h1>hello</h1>
  }`,
  });
  const logger = new Logger();
  const [logs, setLogs] = createSignal<Logger["logs"]>([]);
  let iframe: HTMLDivElement;

  function runCode(code: string) {
    console.log = logger.log;
    console.warn = logger.warn;
    console.error = logger.error;
    console.info = logger.info;

    const func = new Function(code);
    func();
  }

  createEffect(() => {
    logger.clear();
    if (iframe) iframe.innerHTML = "";

    const code = execute(
      files[fileName()],
      {
        "solid-js/web": SolidWeb,
        "solid-js": Solidjs,
        ...files,
      },
      fileName(),
      files
    );
    // reload div to clear previous code

    runCode(code);
    setLogs(logger.logs);
  });

  return (
    <div class="container">
      <div class="playground-container">
        <div class="editor-container">
          <Editor
            fileName={fileName()}
            files={files}
            setFileName={setFileName}
            setFiles={setFiles}
          />
        </div>
        <Console logs={logs} />
      </div>
      <div ref={(v) => (iframe = v)} class="output"></div>
    </div>
  );
};

export default App;
