import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/service/gifs.service';


interface menuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}


@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  gitService = inject(GifService);

  public menuOptions: menuOption[] = [
    {
      icon: 'fa-solid fa-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Gifs Populares',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      route: '/dashboard/search',
      subLabel: 'Buscar gifs',
    },
  ]

}


