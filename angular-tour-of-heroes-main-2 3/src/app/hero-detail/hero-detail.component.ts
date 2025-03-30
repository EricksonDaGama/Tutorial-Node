import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Pet, PetService } from '../pet.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  pets: Pet[] = [];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private petService: PetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getPets();
  }

  // Busca os detalhes do herói com base no ID obtido da rota.
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // Recupera a lista de pets disponíveis a partir do serviço.
  getPets(): void {
    this.petService.getPets().subscribe(pets => this.pets = pets);
  }

  // Atualiza o pet selecionado para o herói.
  onPetSelected(selectedPet: Pet): void {
    if (this.hero) {
      this.hero.pet = selectedPet;
    }
  }

  // Navega de volta à página anterior.
  goBack(): void {
    this.location.back();
  }

  // Salva as alterações efetuadas no herói (incluindo o pet escolhido).
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
