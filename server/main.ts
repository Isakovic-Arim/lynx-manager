import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { userRouter } from './router/user-router';

import Realm from 'realm';

const realm = new Realm.App({ id: process.env.APP_ID! });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users/', userRouter);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

app.post("/api/confirm", async (req, res) => {
  const { token, tokenId } = req.body;
  if (token && tokenId) {
    try {
      await realm.emailPasswordAuth.confirmUser({ token, tokenId });
      res.status(200).json({ 'success': true });
      return;
    } catch (e) {
      console.log(e);
      res.status(400).json({ 'error': 'userpass token is expired or invalid', 'success': false });
      return;
    }
  }

  res.status(400).json({ 'success': false });
});