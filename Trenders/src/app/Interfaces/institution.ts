import { Category } from "./category";
import { User } from "./user";

export interface Institution {
    id: number;
    address: string;
    created_at: string;
    name: string;
    categories: Category[];
    img: string;
}
