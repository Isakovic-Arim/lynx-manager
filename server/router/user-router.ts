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

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users: IUser[] = [];
  try {
    const collection = client.db("users").collection("user");
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

userRouter.get("/like/:mail", async (req, res) => {
  const mail = req.params.mail;
  const users: IUser[] = [];
  try {
    const collection = client.db("users").collection("user");
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