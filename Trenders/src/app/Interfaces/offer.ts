import { Trender } from './trender'
import { Company } from './company'
export interface Offer {
    id: number;
    company: Company;
    trender: Trender;
    details: any[];
}
