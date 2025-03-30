// pets.component.ts
import { Component, OnInit } from '@angular/core';
import { Pet, PetService } from '../pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];
  newPetName: string = '';

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.petService.getPets().subscribe(pets => this.pets = pets);
  }

  add(): void {
  const name = this.newPetName.trim();
  if (!name) { return; }
  this.petService.addPet({ name } as Pet).subscribe(newPet => {
    this.pets.push(newPet);
    this.newPetName = '';
  });
}


  delete(pet: Pet): void {
    this.pets = this.pets.filter(p => p !== pet);
    this.petService.deletePet(pet.id).subscribe();
  }

  update(pet: Pet): void {
    this.petService.updatePet(pet).subscribe();
  }
}
