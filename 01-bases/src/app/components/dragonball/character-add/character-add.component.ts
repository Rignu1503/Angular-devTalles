import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {

  name = signal('');
  power = signal(0);

  //Emitir valores
  newCharacter = output<Character>();

  addCharacter(){
    if (!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    const newCharacterForm: Character = {
     id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power()
    }

    //this.characters.update(list => [...list, newCharacter]);
    this.newCharacter.emit(newCharacterForm);
    this.resetFields();
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
