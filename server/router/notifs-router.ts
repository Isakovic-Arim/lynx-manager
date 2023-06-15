import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { INotification } from '../model/notif-model';

export const notifsRouter = express.Router();

const uri = process.env.URI!;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const collection = client.db('notification').collection('request');

notifsRouter.get('/:userId', async (req, res) => {
    const notifications: INotification[] = [];
    try {
        const cursor = collection.find({userId: req.params.userId});
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            const notif: INotification = { id: doc!._id, userId: doc!.userId, orgName: doc!.orgName };
            notifications.push(notif);
        }
        res.status(200).json(notifications);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

notifsRouter.post('/', async (req, res) => {
    const {userId, orgName} = req.body;
    const notif: INotification = {userId, orgName};

    try {
        const result = await collection.insertOne(notif);
        res.status(200).json(result.acknowledged);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

notifsRouter.delete('/', async (req, res) => {
    try {
        const {name} = req.body;
        const result = (await collection.deleteOne({name: name})).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({error: e});
    }
});