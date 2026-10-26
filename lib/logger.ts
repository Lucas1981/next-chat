type LogFields = Record<string, unknown>;

export function logInfo(event: string, fields: LogFields) {
  console.log(JSON.stringify({ level: "info", event, ...fields }));
}

export function logError(event: string, fields: LogFields) {
  console.log(JSON.stringify({ level: "error", event, ...fields }));
}
