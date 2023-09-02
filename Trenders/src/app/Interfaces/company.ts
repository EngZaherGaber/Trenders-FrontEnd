import { Category } from "./category";
import { User } from "./user";

export interface Company {
    id: number;
    name: string;
    description: string;
    release_date: string;
    categories: Category[];
    user: User;
}
