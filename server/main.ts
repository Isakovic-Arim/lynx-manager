import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(cors());

app.get("/", (req, res) => {
  res.send(JSON.stringify("Lynx - Manager Backend"));
});

app.get("/users", async (req, res) => {
  
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});