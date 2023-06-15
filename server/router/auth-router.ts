import express from 'express';
import Realm from 'realm';

const realm = new Realm.App({ id: process.env.APP_ID! });

export const authRouter = express.Router();

authRouter.post("/confirm", async (req, res) => {
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