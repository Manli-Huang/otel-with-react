import React from 'react';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { CompositePropagator } from '@opentelemetry/core';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { B3Propagator, B3InjectEncoding } from '@opentelemetry/propagator-b3';

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'otel-with-react',
  }),
});

const consoleExporter = new ConsoleSpanExporter();
const zipkinExporter = new ZipkinExporter(); // default endpoint: http://localhost:9411/api/v2/spans

provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
provider.addSpanProcessor(new SimpleSpanProcessor(zipkinExporter));

console.log('registered')
provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new CompositePropagator({
    propagators: [
      new B3Propagator(),
      new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),
    ]
  })
});

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [
        /http:\/\/localhost:5000\.*/
      ],
      clearTimingResources: true
    }),
    // new DocumentLoadInstrumentation(),
    // new UserInteractionInstrumentation(),
  ],
});
const webTracer = provider.getTracer('otel-react')
window.webTracer = webTracer;

export default function TraceProvider({ children }) {
  return (
    <>
      {children}
    </>
  );
}
