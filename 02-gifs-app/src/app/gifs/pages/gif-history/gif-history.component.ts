import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../service/gifs.service';
import { GitListComponent } from "../../components/git-list/git-list.component";


@Component({
  selector: 'app-gif-history',
  imports: [GitListComponent],
  templateUrl: './gif-history.component.html',

})
export default class GifHistoryComponent {

  gifService = inject(GifService)

  //Obtener parametros de url de forma dianmica
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  });



}
