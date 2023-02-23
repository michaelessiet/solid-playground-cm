interface logType {
  message: string;
  type: "error" | "log" | "warn" | "info";
}

export const originalError = console.error;
export const originalLog = console.log;
export const originalWarning = console.warn;
export const originalInfo = console.info;
export const originalClear = console.clear;

export default class Logger {
  public logs: logType[] = [];

  public error = (message: string) => {
    this.logs.push({ message, type: "error" });
    originalError(message);
  };

  public log = (message: string) => {
    this.logs.push({ message, type: "log" });
    originalLog(message);
  };

  public warn = (message: string) => {
    this.logs.push({ message, type: "warn" });
    originalWarning(message);
  };

  public info = (message: string) => {
    this.logs.push({ message, type: "info" });
    originalInfo(message);
  };

  public clear = () => {
    this.logs = [];
    originalClear();
  };

  public getLogs = () => this.logs;

  public pushToLogs = (logs: logType[]) => this.logs.push(...logs);
}
