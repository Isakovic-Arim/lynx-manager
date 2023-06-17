import { ObjectId } from "mongodb";

export interface ITask {
    id: ObjectId;
    name: string;
    due: Date;
    orgName: string;
    assignee: string;
    done: boolean;
}