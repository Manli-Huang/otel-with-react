import React from 'react';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import {ZipkinExporter} from "@opentelemetry/exporter-zipkin";

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'otel-with-react',
  }),
});


provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter()));

provider.register({
  contextManager: new ZoneContextManager()
});

const fetchInstrumentation = new FetchInstrumentation({});

fetchInstrumentation.setTracerProvider(provider);

registerInstrumentations({
  instrumentations: [
    fetchInstrumentation,
    new DocumentLoadInstrumentation(),
    new UserInteractionInstrumentation(),
  ],
});

export default function TraceProvider({ children }) {
  return (
    <>
      {children}
    </>
  );
}
