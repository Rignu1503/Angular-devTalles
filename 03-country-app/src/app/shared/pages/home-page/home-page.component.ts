import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountryLayoutComponent } from "../../../country/layouts/CountryLayout/CountryLayout.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',

})
export class HomePageComponent { }
