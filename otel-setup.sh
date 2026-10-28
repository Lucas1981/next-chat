#!/bin/sh

npm install @vercel/otel @opentelemetry/api @opentelemetry/api-logs @opentelemetry/instrumentation @opentelemetry/resources @opentelemetry/sdk-logs @opentelemetry/sdk-metrics @opentelemetry/sdk-trace-base

# Later, for integration with Dash0
npm install @opentelemetry/exporter-logs-otlp-http@0.223.0