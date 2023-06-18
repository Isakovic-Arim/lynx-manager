import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { INotification } from '../model/notif-model';

export const notifsRouter = express.Router();

const uri = process.env.URI!;

const connect = async () => {
    return new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
}

notifsRouter.get('/:userId', async (req, res) => {
    const notifications: any = [];
    const client = await connect();

    try {
        const collection = client.db('notification').collection('request');

        const cursor = collection.find({ userId: req.params.userId });
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            notifications.push(doc);
        }
        res.status(200).json(notifications);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});

notifsRouter.post('/', async (req, res) => {
    const { userId, orgName } = req.body;
    const notif: INotification = { userId, orgName };
    const client = await connect();

    try {
        const collection = client.db('notification').collection('request');
        const result = await collection.insertOne(notif);
        res.status(200).json(result.acknowledged);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});

notifsRouter.delete('/', async (req, res) => {
    const client = await connect();
    
    try {
        const collection = client.db('notification').collection('request');
        const { name } = req.body;
        const result = (await collection.deleteOne({ name: name })).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});