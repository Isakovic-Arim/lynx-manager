import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { IUser } from '../model/user-model';

export const organisationRouter = express.Router();

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

organisationRouter.get('/:email', async (req, res) => {
    const organisations: any = [];
    const client = await connect();
    
    try {
        const collection = client.db('groups').collection('organisation');
        const cursor = collection.find({ owner: req.params.email });
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            organisations.push(doc);
        }
        res.status(200).json(organisations);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});

organisationRouter.get('/joined/:email', async (req, res) => {
    const organisations: any = [];
    const client = await connect();
    
    try {
        const collection = client.db('groups').collection('organisation');
        const cursor = collection.find({ 'collaborators.email': req.params.email });
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            organisations.push(doc);
        }
        res.status(200).json(organisations);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});

organisationRouter.get('/collaborators/:orgName', async (req, res) => {
    let collaborators: IUser[] = [];
    const client = await connect();

    try {
        const collection = client.db('groups').collection('organisation');
        const doc = await collection.findOne({ name: req.params.orgName });
        if (doc) {
            collaborators = doc.collaborators;
        }
        res.status(200).json(collaborators);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});

organisationRouter.post('/', async (req, res) => {
    const client = await connect();

    try {
        const collection = client.db('groups').collection('organisation');
        const duplicate = await collection.findOne({ name: req.body.orgName });
        let result = false;
        if (duplicate === null) {
            result = (await collection.insertOne(req.body)).acknowledged;
        }
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});

organisationRouter.put('/', async (req, res) => {
    const { name, user } = req.body;
    const client = await connect();

    try {
        const collection = client.db('groups').collection('organisation');
        const doc = await collection.findOne({ name: name });
        const updateDoc = {
            $set: {
                collaborators: [...doc!.collaborators, user]
            },
        };
        const result = (await collection.updateOne({ name: name }, updateDoc)).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        await client.close();
    }
});

organisationRouter.delete('/:orgName', async (req, res) => {
    const client = await connect();

    try {
        const collection = client.db('groups').collection('organisation');
        const result = (await collection.deleteOne({ name: req.params.orgName })).acknowledged;
        res.status(204).json(result);
    } catch (e) {
        res.status(500).json({error: e});
    } finally {
        await client.close();
    }
});