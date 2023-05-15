// @deno-types="npm:@types/express"
import express from "npm:express@4.18.2";
import cors from "npm:cors@2.8.5";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(JSON.stringify("Hello World!"));
});

app.listen(8000);