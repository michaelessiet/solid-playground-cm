const originalConsole = console;

export default class Console {
  public log = (message: string) => {
    originalConsole.log(message);
  }

  public warn = (message: string) => {
    originalConsole.warn(message);
  }

  public error = (message: string) => {
    originalConsole.error(message);
  }

  public info = (message: string) => {
    originalConsole.info(message);
  }
}