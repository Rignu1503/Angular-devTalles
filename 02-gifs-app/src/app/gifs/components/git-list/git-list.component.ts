import { Component, input } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";

@Component({
  selector: 'git-list',
  imports: [GifListItemComponent],
  templateUrl: './git-list.component.html',

})
export class GitListComponent {

  gifs = input.required<string[]>();

 }
