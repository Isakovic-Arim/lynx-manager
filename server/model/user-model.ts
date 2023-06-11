import { ObjectId } from "mongodb";

export interface IUser {
    id: ObjectId;
    email: string;
}