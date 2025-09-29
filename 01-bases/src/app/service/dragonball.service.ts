import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters) : [];

}

@Injectable({providedIn: 'root'})
export class DragoballService {
  constructor() { }

    characters = signal<Character[]>( loadFromLocalStorage() );

  // Los efectos se disparan cuando una señal cambia o se disapara el componente
  saveToLocalStorage = effect( () => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });




  addCharacter(character: Character){
    this.characters.update(
      (list) => [...list, character]
    );
  }


}
