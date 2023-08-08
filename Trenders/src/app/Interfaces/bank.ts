import { User } from "./user";

export interface Bank {
    id:number;
    name:string;
    description:string;
    user:User;
}
