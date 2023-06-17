import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { ITask } from '../model/task-model';

export const taskRouter = express.Router();

const uri = process.env.URI!;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const collection = client.db('tasks').collection('task');

taskRouter.get('/', async (req, res) => {
    const tasks: any = [];
    try {
        const cursor = collection.find();
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            tasks.push(doc);
        }
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

taskRouter.get('/org/:orgName', async (req, res) => {
    const tasks: any = [];
    try {
        const cursor = collection.find({orgName: req.params.orgName});
        while (await cursor.hasNext()) {
            tasks.push(await cursor.next());
        }
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

taskRouter.get('/assignee/:assignee', async (req, res) => {
    const tasks: any = [];
    try {
        const cursor = collection.find({assignee: req.params.assignee});
        while (await cursor.hasNext()) {
            tasks.push(await cursor.next());
        }
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

taskRouter.post('/', async (req, res) => {
    try {
        // const {name, due, orgId, assigneeId} = req.body;
        // const task: ITask = {name, due, orgId, assigneeId};
        const result = (await collection.insertOne(req.body)).acknowledged;
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

taskRouter.put('/:id', async (req, res) => {
    try {
        await collection.updateOne({_id: new ObjectId(req.params.id)}, {$set: {done: req.body.done}});
        res.sendStatus(204);
    } catch (e) {
        res.status(500).json({error: e});
    }
});