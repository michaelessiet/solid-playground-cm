import { Accessor, For, createMemo } from "solid-js";
import Logger from "../utils/logger";

interface Props {
  logs: Accessor<Logger["logs"]>;
}

const Console = (props: Props) => {
  return (
    <div class="console">
      <For each={props.logs()}>
        {(log, i) => (
          <div class={`${log.type}-log log`}>
            <span>{log.message}</span>
          </div>
        )}
      </For>
    </div>
  );
};

export default Console;
