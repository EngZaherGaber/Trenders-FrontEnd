import { Institution } from './institution'
export interface Trender {
    id: number;
    title: string;
    description: string;
    ended_at: Date,
    updated_at: Date,
    created_at: Date,
    institution_id: number;
    details: any[];
    img: string;
}
