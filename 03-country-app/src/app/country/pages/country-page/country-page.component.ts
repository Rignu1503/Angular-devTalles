import { Component, inject, } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../service/country.service';
import { map, Observable, of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";


@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',

})
export class CountryPageComponent {

  countryCode = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['code'])));
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode() }),
    stream: ({ params }): Observable<Country[]> => {

      return params.code
        ? this.countryService.searchCountryByAlphaCode(params.code) ?? of([])
        : of([]);
    }

  })




}
