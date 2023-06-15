import { ObjectId } from "mongodb";
import { IUser } from "./user-model";

export interface IOrganisation {
    id: ObjectId;
    name: string;
    owner: string;
    collaborators: IUser[];
}