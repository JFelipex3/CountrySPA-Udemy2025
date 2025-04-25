import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  // Map para par valor v/s Set que almacena valores únicos
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital( query: string ): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCapital.has(lowerCaseQuery)) {
      return of(this.queryCacheCapital.get(lowerCaseQuery) as Country[] ?? []);
    }

    const url = `${API_URL}/capital/${query}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries) ),
        tap( countries => this.queryCacheCapital.set(lowerCaseQuery, countries) ),
        catchError( error => {
          console.log('Error fetching ', error);
          return throwError( () => new Error(`No se pudo obtener países que coincidan con el valor ${query}`) );
        })
      );
  }

  searchByCountry( query: string ): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCountry.has(lowerCaseQuery)) {
      return of(this.queryCacheCountry.get(lowerCaseQuery) as Country[] ?? []);
    }

    const url = `${API_URL}/name/${query}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries) ),
        tap( countries => this.queryCacheCountry.set(lowerCaseQuery, countries) ),
        //delay( 3000 ),
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

  searchByRegion( region: string ): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) as Country[] ?? []);
    }

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries) ),
        tap( countries => this.queryCacheRegion.set(region, countries) ),
        catchError( error => {
          console.log('Error fetching ', error);
          return throwError( () => new Error(`No se pudo obtener países de la región ${region}`) );
        })
      );
  }

}
