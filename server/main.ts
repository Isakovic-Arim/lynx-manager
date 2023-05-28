import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import Realm from 'realm';
import { MongoClient } from 'mongodb';

const realm = new Realm.App({ id: process.env.APP_ID! });
const client = new MongoClient(process.env.URI!);

async function run() {
  try {
    if (realm.currentUser !== null) {
      const mongodb = realm.currentUser.mongoClient("mongodb-atlas");
      console.log(mongodb);
      const reviews = mongodb.db("sample_airbnb").collection("listingsAndReviews");
      console.log(await reviews.count());
    }
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

const app = express();
app.use(cors());
app.use(express.json());

app.post("/confirm", async (req, res) => {
  const { token, tokenId } = req.body;
  if (token && tokenId) {
    try {
      await realm.emailPasswordAuth.confirmUser({token, tokenId});
      res.status(200).json({ 'success': true });
      return;
    } catch (e) {
      console.log(e);
      res.status(400).json({'error': 'userpass token is expired or invalid', 'success': false});
      return;
    }
  }
  
  res.status(400).json({'success': false});
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});