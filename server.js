const express = require('express');
const cors = require('cors');

const COMPLIANCES = [
  { id: "1", name: "Plutus 2021 Company tax return" },
  { id: "2", name: "M 2022 BAS" },
  { id: "3", name: "Practice 2022 Individual tax return" }
];
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/compliances/:id', (req, res) => {
  const foundCompliance = COMPLIANCES.find(compliance => compliance.id === req.params.id);
  if (!foundCompliance) {
    return res.status(404).end;
  }
  res.status(200).json(foundCompliance);
});

app.get('/compliances', (req, res) => {
  res.status(200).json(COMPLIANCES);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

