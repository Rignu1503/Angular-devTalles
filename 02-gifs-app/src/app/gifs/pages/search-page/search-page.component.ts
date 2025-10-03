import { Component, inject, signal } from '@angular/core';
import { GitListComponent } from "../../components/git-list/git-list.component";
import { GifService } from '../../service/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GitListComponent],
  templateUrl: './search-page.component.html',

})
export default class SearchPageComponent {

  gifsService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string ){

    this.gifsService.searchGifs(query)
      .subscribe( resp => {
        this.gifs.set(resp);
      })
  }

 }
