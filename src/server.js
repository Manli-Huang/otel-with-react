const api = require("@opentelemetry/api");
const tracer = require('./tracer')('otel-https-server');
const cors = require('cors');
const express = require('express');

const COMPLIANCES = [
  { id: "1", name: "Plutus 2021 Company tax return" },
  { id: "2", name: "M 2022 BAS" },
  { id: "3", name: "Practice 2022 Individual tax return" }
];
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// app.get('/compliances/:id', (req, res) => {
//   const currentSpan = api.trace.getSpan(api.context.active());
//   console.log(`currentSpan: ${currentSpan}`);
//   const span = tracer.startSpan(`getComplianceById`, {
//     kind: 1, // server
//     attributes: { key: 'value' },
//   });
//   span.addEvent('compliance sent');
//   const foundCompliance = COMPLIANCES.find(compliance => compliance.id === req.params.id);
//   if (!foundCompliance) {
//     span.end();
//     return res.status(404).end;
//   }
//   span.end();
//   res.status(200).json(foundCompliance);
// });

app.get('/compliances', (req, res) => {
  const currentSpan = api.trace.getSpan(api.context.active());
  console.log(`traceid: ${currentSpan ? currentSpan.spanContext().traceId : 'no trace id'}`);
  const span = tracer.startSpan('getCompliances', {
    kind: 1, // server
    attributes: { key: 'value' },
  });
  span.addEvent('compliances sent');
  span.end();
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Request-Method', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.status(200).json(COMPLIANCES);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
