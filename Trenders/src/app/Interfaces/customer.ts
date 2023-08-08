import { User } from "./user";

export interface Customer {
    id:number;
    firstName:string;
    lastName:string;
    birthDate:Date;
    user:User;
}
