import {
  logs,
  SeverityNumber,
  type AnyValueMap,
} from "@opentelemetry/api-logs";

type LogFields = Record<string, string | number | boolean>;

const logger = logs.getLogger("my-app");

export function logInfo(event: string, fields: LogFields) {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: event,
    attributes: fields satisfies AnyValueMap,
  });
}

export function logError(event: string, fields: LogFields) {
  logger.emit({
    severityNumber: SeverityNumber.ERROR,
    severityText: "ERROR",
    body: event,
    attributes: fields satisfies AnyValueMap,
  });
}
