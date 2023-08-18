import { Category } from "./category";
import { User } from "./user";

export interface Institution {
    id: number;
    address: string;
    created_at: string;
    user: User;
    categories: Category[];
}
