import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(JSON.stringify("Hello World!"));
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});