// pet.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Pet {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsUrl = 'api/pets';  // URL para a API simulada

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET: retorna os pets do servidor */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl);
  }

  /** POST: adiciona um novo pet ao servidor */
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.petsUrl, pet, this.httpOptions);
  }

  /** DELETE: elimina um pet do servidor */
  deletePet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`;
    return this.http.delete<Pet>(url, this.httpOptions);
  }

  /** PUT: atualiza um pet no servidor */
  updatePet(pet: Pet): Observable<any> {
    return this.http.put(this.petsUrl, pet, this.httpOptions);
  }
}
