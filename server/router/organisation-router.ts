import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { IOrganisation } from '../model/organisation-model';
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

organisationRouter.get('/:userId', async (req, res) => {
    const organisations: IOrganisation[] = [];
    try {
        const cursor = collection.find({ owner: req.params.userId });
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            const organisation: IOrganisation = { id: doc!._id, name: doc!.orgName, owner: doc!.owner, collaborators: doc!.collaborators };
            organisations.push(organisation);
        }
        res.status(200).json(organisations);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.get('/joined/:userId', async (req, res) => {
    const organisations: IOrganisation[] = [];
    try {
        const cursor = collection.find({ 'collaborators.id': req.params.userId });
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            const organisation: IOrganisation = { id: doc!._id, name: doc!.orgName, owner: doc!.owner, collaborators: doc!.collaborators };
            organisations.push(organisation);
        }
        res.status(200).json(organisations);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.get('/collaborators/:orgName', async (req, res) => {
    let collaborators: IUser[] = [];
    try {
        const doc = await collection.findOne({ orgName: req.params.orgName });
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
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.put('/', async (req, res) => {
    const { orgName, user } = req.body;
    try {
        const doc = await collection.findOne({ orgName: orgName });
        const updateDoc = {
            $set: {
                collaborators: [...doc!.collaborators, user]
            },
        };
        const result = (await collection.updateOne({ orgName: orgName }, updateDoc)).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

organisationRouter.delete('/:orgName', async (req, res) => {
    try {
        const result = (await collection.deleteOne({ orgName: req.params.orgName })).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({error: e});
    }
});