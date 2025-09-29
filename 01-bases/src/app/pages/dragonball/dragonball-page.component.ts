import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Character } from '../../interfaces/character.interface';


@Component({
  selector: 'app-dragonball-page',
  //imports: [NgClass],
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {


  name =signal('')
  power = signal(100)

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 12000 },
    // { id: 3, name: 'Piccolo', power: 8000 },
    // { id: 4, name: 'Krillin', power: 500 },
    // { id: 5, name: 'Gohan', power: 10000 },
  ]);

  addCharacter(){

    if (!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update(list => [...list, newCharacter]);
    this.resetFields();
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }


  // powerClasses = computed(() =>{
  //   return{
  //     'text-danger': true
  //   }
  // })

 }
