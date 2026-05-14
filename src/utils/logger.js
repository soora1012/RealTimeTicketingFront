const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
  const stack = new Error().stack;
  let fileName = "";
  let functionName = "";
  if (stack) {
    const lines = stack.split("\n");
    const caller = lines.find(line =>
      line.includes("/src/") &&
      !line.includes("/utils/logger")
    );

    if (caller) {
      const funcMatch = caller.match(/at\s+(.+?)\s+\(/);
      const fileMatch = caller.match(/\/([^\/]+)\.(vue|js|ts)(?:\?.*)?:\d+:\d+/);

      if (funcMatch) {
        functionName = funcMatch[1].replace("Proxy.", "");
      }

      if (fileMatch) {
        fileName = fileMatch[1];
      }
    }
  }

  originalLog(`[${fileName}]`, ...args);
};

console.error = (...args) => {
  originalError(
    `[ERROR]`,
    ...args
  );
};