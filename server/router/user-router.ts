import express from 'express';

import { MongoClient, ServerApiVersion } from 'mongodb';
import { IUser } from '../model/user-model';

const uri = process.env.URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const collection = client.db("users").collection("user");

export const userRouter = express.Router();

userRouter.get("/", async (_, res) => {
  const users: IUser[] = [];
  try {
    const cursor = collection.find();
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const user: IUser = { id: doc!._id, email: doc!.email };
      users.push(user);
    }
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// userRouter.get("/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await collection.findOne({id: "6485bd006b095b5bba5b75b7", email: "arim.isakovic2005@gmail.com"});
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Error retrieving user" });
//   }
// });


userRouter.get("/like/:mail", async (req, res) => {
  const mail = req.params.mail;
  const users: IUser[] = [];
  try {
    const regex = RegExp(mail, "i");
    const cursor = collection.find({ email: regex });
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const user: IUser = { id: doc!._id, email: doc!.email };
      users.push(user);
    }
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});