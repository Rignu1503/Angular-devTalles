
import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragoballService } from '../../service/dragonball.service';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragonball-super-page',
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {

  public daragoballService = inject(DragoballService);

  title = 'Dragon Ball Super Characters';


 }
