import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse( gifsFromLocalStorage);

  return gifs

}

@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>( loadFromLocalStorage() );
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  })

  loadTrendingGifs(): void {

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/tr ending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20'
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifsArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log(gifs);
    });
  }

  searchGifs(query: string): Observable<Gif[]> {

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        q: query,
      }
    }).pipe(
      map( ({ data }) => data ),
      map( (item) => GifMapper.mapGiphyItemsToGifsArray(item)),

      //Historal
      tap( item => {
        this.searchHistory.update( history => ({
          ...history, [query.toLowerCase()]: item
        }))
      })
    );
  }

  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? [];
  }



}
