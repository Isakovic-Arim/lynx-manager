import { ObjectId } from "mongodb";

export interface INotification {
    id?: ObjectId;
    userId: ObjectId;
    orgName: string;
}