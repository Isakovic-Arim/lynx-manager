import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { IUser } from '../model/user-model';

export const organisationRouter = express.Router();

const uri = process.env.URI!;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const collection = client.db('groups').collection('organisation');

organisationRouter.get('/:email', async (req, res) => {
    const organisations: any = [];
    try {
        const cursor = collection.find({ owner: req.params.email });
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            organisations.push(doc);
        }
        res.status(200).json(organisations);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.get('/joined/:email', async (req, res) => {
    const organisations: any = [];
    try {
        const cursor = collection.find({ 'collaborators.email': req.params.email });
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            organisations.push(doc);
        }
        res.status(200).json(organisations);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.get('/collaborators/:orgName', async (req, res) => {
    let collaborators: IUser[] = [];
    try {
        const doc = await collection.findOne({ name: req.params.orgName });
        collaborators = doc!.collaborators; // fix checking later
        res.status(200).json(collaborators);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.post('/', async (req, res) => {
    try {
        const duplicate = await collection.findOne({ orgName: req.body.orgName });
        let result = false;
        if (duplicate === null) {
            result = (await collection.insertOne(req.body)).acknowledged;
        }
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.put('/', async (req, res) => {
    const { orgName, user } = req.body;
    try {
        const doc = await collection.findOne({ name: orgName });
        const updateDoc = {
            $set: {
                collaborators: [...doc!.collaborators, user]
            },
        };
        const result = (await collection.updateOne({ name: orgName }, updateDoc)).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.delete('/:orgName', async (req, res) => {
    try {
        const result = (await collection.deleteOne({ name: req.params.orgName })).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({error: e});
    }
});