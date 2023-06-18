import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

export const taskRouter = express.Router();

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

taskRouter.get('/', async (req, res) => {
    const tasks: any = [];
    const client = await connect();

    try {
        const collection = client.db('tasks').collection('task');
        const cursor = collection.find();
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            tasks.push(doc);
        }
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({error: e});
    } finally {
        await client.close();
    }
});

taskRouter.get('/org/:orgName', async (req, res) => {
    const tasks: any = [];
    const client = await connect();
    
    try {
        const collection = client.db('tasks').collection('task');
        const cursor = collection.find({orgName: req.params.orgName});
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            tasks.push(doc);
        }
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({error: e});
    } finally {
        await client.close();
    }
});

taskRouter.get('/assignee/:assignee', async (req, res) => {
    const tasks: any = [];
    const client = await connect();
    
    try {
        const collection = client.db('tasks').collection('task');
        const cursor = collection.find({assignee: req.params.assignee});
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            tasks.push(doc);
        }
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({error: e});
    } finally {
        await client.close();
    }
});

taskRouter.post('/', async (req, res) => {
    const client = await connect();
    
    try {
        const collection = client.db('tasks').collection('task');
        const result = (await collection.insertOne(req.body)).acknowledged;
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({error: e});
    } finally {
        await client.close();
    }
});

taskRouter.put('/:id', async (req, res) => {
    const client = await connect();
    
    try {
        const collection = client.db('tasks').collection('task');
        await collection.updateOne({_id: new ObjectId(req.params.id)}, {$set: {done: req.body.done}});
        res.sendStatus(204);
    } catch (e) {
        res.status(500).json({error: e});
    } finally {
        await client.close();
    }
});