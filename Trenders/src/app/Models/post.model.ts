import { Detail } from "./detail.model";
import { Info } from "./info.model";
import { Publisher } from './publisher.model';

export class Post {
    id: number;
    product: string;
    head: string;
    comments: string[];
    likes: number;
    detials: Detail;
    publisher: Publisher;
    c_price: number;
    l_price: number;
    gurantee: number;
    infos: Info[];
}
