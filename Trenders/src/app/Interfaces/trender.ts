import { Institution } from './institution'
export interface Trender {
    id: number;
    title: string;
    description: string;
    institute: Institution;
    details: any[];
    img: string;
}
