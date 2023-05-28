import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import Realm from 'realm';
import { MongoClient, ServerApiVersion } from 'mongodb';

const realm = new Realm.App({ id:  process.env.APP_ID!});
const client = new MongoClient(process.env.URI!);

async function run() {
  try {
    realm.currentUser?.logOut();
    const user: Realm.User = await realm.logIn(Realm.Credentials.anonymous());
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

app.get("/", (req, res) => {
  res.send(JSON.stringify("Lynx - Manager Backend"));
});

app.get("/users", async (req, res) => {
  
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});