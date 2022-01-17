import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/herore.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(private heroeService: HeroesService) {}

  heroes: HeroeModel[];

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroeService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
    });
  }

  deleteHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de eliminar a ${heroe.nombre}?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i, 1);
        this.heroeService.deleteHeroe(heroe.id as string).subscribe();
        Swal.fire('Eliminado!', 'Registro eliminado.', 'success');
      }
    });
  }
}
