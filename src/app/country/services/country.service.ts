import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();
    const url = `${API_URL}/capital/${query}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries) ),
        catchError( error => {
          console.log('Error fetching ', error);
          return throwError( () => new Error(`No se pudo obtener países que coincidan con el valor ${query}`) );
        })
      );
  }

  searchByCountry( query: string ): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();
    const url = `${API_URL}/name/${query}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries) ),
        delay( 3000 ),
        catchError( error => {
          console.log('Error fetching ', error);
          return throwError( () => new Error(`No se pudo obtener países que coincidan con el valor ${query}`) );
        })
      );
  }

  searchByAlphaCode( code: string ) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries) ),
        map( (countries) => countries.at(0)),
        catchError( error => {
          console.log('Error fetching ', error);
          return throwError( () => new Error(`No se pudo obtener países con ese código ${code}`) );
        })
      );
  }

}
