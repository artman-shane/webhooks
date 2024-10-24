const express = require("express");
const bodyParser = require("body-parser");
const ngrok = require("ngrok");

const app = express();
const PORT = 5050;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.use("/api", (req, res) => {
  console.log("Headers", req.headers, "\n\n");
  console.log("Body", req.body, "\n\n");
  console.log("Query", req.query, "\n\n");
  console.log(`TranscriptionData: ${req.query.TranscriptionData}`);
  console.log(`Transcript: ${req.query.TranscriptionData.transcript}`);
  res.status(200).end();
});

(async function () {
  const url = await ngrok.connect({
    addr: PORT,
    subdomain: "shane",
  });
  console.log(`ngrok tunnel opened at ${url}`);
})();
