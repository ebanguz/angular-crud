import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HeroeModel } from '../models/herore.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://heroes-app-0-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo));
  }

  getHeroe(id: string) {
    return this.http
      .get(`${this.url}/heroes/${id}.json`)
      .pipe(map((resp) => resp));
  }
  deleteHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  crearArreglo(heroesObj: object) {
    if (heroesObj === null) {
      return [];
    }
    const heroes: HeroeModel[] = [];

    for (let [k, v] of Object.entries(heroesObj)) {
      const heroe: HeroeModel = v;
      heroe.id = k;
      heroes.push(heroe);
    }

    return heroes;
  }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe,
    };
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }
}
