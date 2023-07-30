import { Detail } from "./detail.model";
import { Post } from "./post.model";

export class Bill {
    post: Post;
    productsDetails: {
        total: number,
        details: Detail
    }[];
    financeInfo: { cardType: string, cardCvv: string, cardNumber: number };
    deliveryType: string;
}
