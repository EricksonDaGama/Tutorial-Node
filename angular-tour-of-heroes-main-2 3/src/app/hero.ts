// hero.ts
import { Pet } from './pet.service';

export interface Hero {
  id: number;
  name: string;
  pet?: Pet; // pet selecionado para o herói
}
