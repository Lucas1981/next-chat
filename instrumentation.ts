import { registerOTel } from "@vercel/otel";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import {
  //   ConsoleLogRecordExporter,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";

export function register() {
  registerOTel({
    serviceName: "my-app",
    logRecordProcessors: [
      new SimpleLogRecordProcessor({
        exporter: new OTLPLogExporter(),
      }),
    ],
  });
}
