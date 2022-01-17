import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/herore.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();
  id: string = '';
  constructor(
    private _heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('Param: ' + this.id);
    if (this.id !== 'nuevo') {
      this.getHeroe();
    }
  }

  getHeroe() {
    this._heroesService.getHeroe(this.id).subscribe((resp) => {
      this.heroe = resp as HeroeModel;
      this.heroe.id = this.id;
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Formulario no válido',
      });
      return;
    }

    Swal.fire({
      title: 'Espere',
      icon: 'info',
      text: 'Guardando información',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this._heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this._heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe((resp) => {
      console.log(resp);
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se guardó correctamente',
        icon: 'success',
      });
    });
  }
}
