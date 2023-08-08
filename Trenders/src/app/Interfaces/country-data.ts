export interface CountryData {
    name: {
        common: string,
        official: string
    };
    alpha2Code: string;
    alpha3Code: string;
    idd: {
        root: string,
        suffixes: string[];
    };
    capital: string;
    borders: string[];
    languages: {
        name: string;
        iso639_1: string;
        iso639_2: string
    }[];
    currencies: {
        code: string;
        name: string;
        symbol: string;
    }[];
    flag: string;
    population: number;
    region: string;
    subregion: string;
    states?: string[]; // Optional state list
}