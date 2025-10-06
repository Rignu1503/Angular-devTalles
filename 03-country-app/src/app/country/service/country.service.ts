import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError, delay, of } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    //Peticion
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      //Mapeamos la respuestas
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      //si sale error
      catchError((error) => {
        console.log('error fetching', error);

        return throwError(() => new Error(`No se encontro paises con el query: ${query}`))

      })
    )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    //Peticion
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      //Mapeamos la respuestas
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      delay(2000),
      //si sale error
      catchError((error) => {
        console.log('error fetching', error);

        return throwError(() => new Error(`No se encontro pais con el query: ${query}`))

      })
    )
  }

searchCountryByAlphaCode(code: string): Observable<Country[]> {
  code = code.toLowerCase();

  return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
    map((respCountry) => CountryMapper.mapRestCountryArrayToCountryArray(respCountry)),
    delay(1000),
    catchError((error) => {
      console.error('Error fetching', error);
      // En caso de error, devuelves un arreglo vacío en vez de lanzar error
      return of([]);
    })
  );
}


}
