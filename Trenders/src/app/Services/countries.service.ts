import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CountryData } from '../Interfaces/country-data';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class CountriesService {
  countries: CountryData[] = [];
  countries$: any;
  currencies: string[] = [];
  currencies$: any;
  cities$: any;
  cities: any = [];
  countryPhoneLengths = [
    { name: 'Afghanistan', phoneLength: 11 },
    { name: 'Albania', phoneLength: 9 },
    { name: 'Algeria', phoneLength: 10 },
    { name: 'Andorra', phoneLength: 6 },
    { name: 'Angola', phoneLength: 9 },
    { name: 'Antigua and Barbuda', phoneLength: 7 },
    { name: 'Argentina', phoneLength: 10 },
    { name: 'Armenia', phoneLength: 8 },
    { name: 'Australia', phoneLength: 10 },
    { name: 'Austria', phoneLength: 11 },
    { name: 'Azerbaijan', phoneLength: 9 },
    { name: 'Bahamas', phoneLength: 7 },
    { name: 'Bahrain', phoneLength: 8 },
    { name: 'Bangladesh', phoneLength: 10 },
    { name: 'Barbados', phoneLength: 7 },
    { name: 'Belarus', phoneLength: 9 },
    { name: 'Belgium', phoneLength: 9 },
    { name: 'Belize', phoneLength: 7 },
    { name: 'Benin', phoneLength: 8 },
    { name: 'Bhutan', phoneLength: 8 },
    { name: 'Bolivia', phoneLength: 8 },
    { name: 'Bosnia and Herzegovina', phoneLength: 8 },
    { name: 'Botswana', phoneLength: 8 },
    { name: 'Brazil', phoneLength: 11 },
    { name: 'Brunei', phoneLength: 7 },
    { name: 'Bulgaria', phoneLength: 9 },
    { name: 'Burkina Faso', phoneLength: 8 },
    { name: 'Burundi', phoneLength: 8 },
    { name: 'Cambodia', phoneLength: 9 },
    { name: 'Cameroon', phoneLength: 9 },
    { name: 'Canada', phoneLength: 10 },
    { name: 'Cape Verde', phoneLength: 7 },
    { name: 'Central African Republic', phoneLength: 8 },
    { name: 'Chad', phoneLength: 8 },
    { name: 'Chile', phoneLength: 9 },
    { name: 'China', phoneLength: 11 },
    { name: 'Colombia', phoneLength: 10 },
    { name: 'Comoros', phoneLength: 7 },
    { name: 'Costa Rica', phoneLength: 8 },
    { name: 'Croatia', phoneLength: 9 },
    { name: 'Cuba', phoneLength: 8 },
    { name: 'Cyprus', phoneLength: 8 },
    { name: 'Czech Republic', phoneLength: 9 },
    { name: 'Democratic Republic of the Congo', phoneLength: 11 },
    { name: 'Denmark', phoneLength: 8 },
    { name: 'Djibouti', phoneLength: 8 },
    { name: 'Dominica', phoneLength: 7 },
    { name: 'Dominican Republic', phoneLength: 10 },
    { name: 'East Timor', phoneLength: 7 },
    { name: 'Ecuador', phoneLength: 9 },
    { name: 'Egypt', phoneLength: 10 },
    { name: 'El Salvador', phoneLength: 8 },
    { name: 'Equatorial Guinea', phoneLength: 7 },
    { name: 'Eritrea', phoneLength: 7 },
    { name: 'Estonia', phoneLength: 8 },
    { name: 'Ethiopia', phoneLength: 10 },
    { name: 'Fiji', phoneLength: 7 },
    { name: 'Finland', phoneLength: 10 },
    { name: 'France', phoneLength: 10 },
    { name: 'Gabon', phoneLength: 7 },
    { name: 'Gambia', phoneLength: 7 },
    { name: 'Georgia', phoneLength: 9 },
    { name: 'Germany', phoneLength: 11 },
    { name: 'Ghana', phoneLength: 9 },
    { name: 'Greece', phoneLength: 10 },
    { name: 'Grenada', phoneLength: 7 },
    { name: 'Guatemala', phoneLength: 8 },
    { name: 'Guyana', phoneLength: 7 },
    { name: 'Haiti', phoneLength: 8 },
    { name: 'Honduras', phoneLength: 8 },
    { name: 'Hungary', phoneLength: 9 },
    { name: 'Iceland', phoneLength: 7 },
    { name: 'India', phoneLength: 10 },
    { name: 'Indonesia', phoneLength: 10 },
    { name: 'Iran', phoneLength: 10 },
    { name: 'Iraq', phoneLength: 10 },
    { name: 'Ireland', phoneLength: 9 },
    { name: 'Israel', phoneLength: 9 },
    { name: 'Italy', phoneLength: 10 },
    { name: 'Ivory Coast', phoneLength: 8 },
    { name: 'Jamaica', phoneLength: 7 },
    { name: 'Japan', phoneLength: 10 },
    { name: 'Jordan', phoneLength: 9 },
    { name: 'Kazakhstan', phoneLength: 10 },
    { name: 'Kenya', phoneLength: 10 },
    { name: 'Kiribati', phoneLength: 5 },
    { name: 'Kosovo', phoneLength: 8 },
    { name: 'Kuwait', phoneLength: 8 },
    { name: 'Kyrgyzstan', phoneLength: 9 },
    { name: 'Laos', phoneLength: 8 },
    { name: 'Latvia', phoneLength: 8 },
    { name: 'Lebanon', phoneLength: 8 },
    { name: 'Lesotho', phoneLength: 8 },
    { name: 'Liberia', phoneLength: 8 },
    { name: 'Libya', phoneLength: 10 },
    { name: 'Liechtenstein', phoneLength: 7 },
    { name: 'Lithuania', phoneLength: 8 },
    { name: 'Luxembourg', phoneLength: 8 },
    { name: 'Madagascar', phoneLength: 9 },
    { name: 'Malawi', phoneLength: 9 },
    { name: 'Malaysia', phoneLength: 9 },
    { name: 'Maldives', phoneLength: 7 },
    { name: 'Mali', phoneLength: 8 },
    { name: 'Malta', phoneLength: 8 },
    { name: 'Marshall Islands', phoneLength: 7 },
    { name: 'Mauritania', phoneLength: 9 },
    { name: 'Mauritius', phoneLength: 7 },
    { name: 'Mexico', phoneLength: 10 },
    { name: 'Micronesia', phoneLength: 7 },
    { name: 'Moldova', phoneLength: 8 },
    { name: 'Monaco', phoneLength: 7 },
    { name: 'Mongolia', phoneLength: 8 },
    { name: 'Montenegro', phoneLength: 8 },
    { name: 'Morocco', phoneLength: 10 },
    { name: 'Mozambique', phoneLength: 9 },
    { name: 'Myanmar', phoneLength: 8 },
    { name: 'Namibia', phoneLength: 8 },
    { name: 'Nauru', phoneLength: 4 },
    { name: 'Nepal', phoneLength: 10 },
    { name: 'Netherlands', phoneLength: 10 },
    { name: 'New Zealand', phoneLength: 10 },
    { name: 'Nicaragua', phoneLength: 8 },
    { name: 'Niger', phoneLength: 8 },
    { name: 'Nigeria', phoneLength: 10 },
    { name: 'North Korea', phoneLength: 11 },
    { name: 'North Macedonia', phoneLength: 8 },
    { name: 'Norway', phoneLength: 8 },
    { name: 'Oman', phoneLength: 8 },
    { name: 'Pakistan', phoneLength: 10 },
    { name: 'Palau', phoneLength: 7 },
    { name: 'Palestine', phoneLength: 9 },
    { name: 'Panama', phoneLength: 8 },
    { name: 'Papua New Guinea', phoneLength: 9 },
    { name: 'Paraguay', phoneLength: 9 },
    { name: 'Peru', phoneLength: 9 },
    { name: 'Philippines', phoneLength: 10 },
    { name: 'Poland', phoneLength: 9 },
    { name: 'Portugal', phoneLength: 9 },
    { name: 'Qatar', phoneLength: 8 },
    { name: 'Romania', phoneLength: 10 },
    { name: 'Russia', phoneLength: 10 },
    { name: 'Rwanda', phoneLength: 9 },
    { name: 'Saint Kitts and Nevis', phoneLength: 7 },
    { name: 'Saint Lucia', phoneLength: 7 },
    { name: 'Saint Vincent and the Grenadines', phoneLength: 7 },
    { name: 'Samoa', phoneLength: 7 },
    { name: 'San Marino', phoneLength: 6 },
    { name: 'Sao Tome and Principe', phoneLength: 7 },
    { name: 'Saudi Arabia', phoneLength: 9 },
    { name: 'Senegal', phoneLength: 9 },
    { name: 'Serbia', phoneLength: 8 },
    { name: 'Seychelles', phoneLength: 7 },
    { name: 'Sierra Leone', phoneLength: 8 },
    { name: 'Singapore', phoneLength: 8 },
    { name: 'Slovakia', phoneLength: 9 },
    { name: 'Slovenia', phoneLength: 8 },
    { name: 'Solomon Islands', phoneLength: 7 },
    { name: 'Somalia', phoneLength: 8 },
    { name: 'South Africa', phoneLength: 9 },
    { name: 'South Korea', phoneLength: 10 },
    { name: 'South Sudan', phoneLength: 9 },
    { name: 'Spain', phoneLength: 9 },
    { name: 'Sri Lanka', phoneLength: 10 },
    { name: 'Sudan', phoneLength: 10 },
    { name: 'Suriname', phoneLength: 7 },
    { name: 'Sweden', phoneLength: 9 },
    { name: 'Switzerland', phoneLength: 9 },
    { name: 'Syria', phoneLength: 9 },
    { name: 'Taiwan', phoneLength: 9 },
    { name: 'Tajikistan', phoneLength: 9 },
    { name: 'Tanzania', phoneLength: 10 },
    { name: 'Thailand', phoneLength: 9 },
    { name: 'Togo', phoneLength: 8 },
    { name: 'Tonga', phoneLength: 7 },
    { name: 'Trinidad and Tobago', phoneLength: 7 },
    { name: 'Tunisia', phoneLength: 8 },
    { name: 'Turkey', phoneLength: 10 },
    { name: 'Turkmenistan', phoneLength: 8 },
    { name: 'Tuvalu', phoneLength: 5 },
    { name: 'Uganda', phoneLength: 10 },
    { name: 'Ukraine', phoneLength: 9 },
    { name: 'United Arab Emirates', phoneLength: 9 },
    { name: 'United Kingdom', phoneLength: 10 },
    { name: 'United States of America', phoneLength: 10 },
    { name: 'Uruguay', phoneLength: 8 },
    { name: 'Uzbekistan', phoneLength: 9 },
    { name: 'Vanuatu', phoneLength: 7 },
    { name: 'Vatican City', phoneLength: 6 },
    { name: 'Venezuela', phoneLength: 10 },
    { name: 'Vietnam', phoneLength: 10 },
    { name: 'Yemen', phoneLength: 9 },
    { name: 'Zambia', phoneLength: 9 },
    { name: 'Zimbabwe', phoneLength: 9 },
  ]
  constructor(private http: HttpClient) {
    // this.countries$ = this.http.get('https://restcountries.com/v3.1/all')
    //   .pipe(map((countries: CountryData[]) => {
    //     return countries
    //       .sort((a, b) => {
    //         return a.name.common.localeCompare(b.name.common)
    //       })
    //   }))
    // this.countries$.subscribe(countries => {
    //   countries.forEach(country => {
    //     this.countries.push(country)
    //     // console.log(country.currencies)
    //   });
    // })
    // this.cities$ = 
    // this.cities$.subscribe(countries => {
    //   countries.data.forEach(x => this.cities.push(x));
    // });
    // this.currencies$ = http.get('https://openexchangerates.org/api/currencies.json')
    //   .pipe(map((currency) => {
    //     return currency
    //   }))
    // this.currencies$.subscribe(currencies => {
    //   Object.keys(currencies).forEach(x => this.currencies.push(x))
    // });
  }
  getAllCities(country: string): Observable<string[]> {
    return this.http.get('https://countriesnow.space/api/v0.1/countries')
      .pipe(map((res: any) => {
        if (res['data']) {
          const countryData = res['data'].find(x => x.country === country);
          return countryData?.cities as string[] || [];
        }
        else {
          return null;
        }
      }))
  }
}

