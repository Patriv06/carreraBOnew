import { Component, OnInit } from '@angular/core';
import { Autodromos } from '../autodromos/autodromos';
import { Carreras } from '../carreras/carreras';
import { CarrerasService } from '../carreras/carreras.service';
import { Categorias } from '../categorias/categorias';

@Component({
  selector: 'app-carrera-piloto',
  templateUrl: './carrera-piloto.component.html',
  styleUrls: ['./carrera-piloto.component.scss']
})
export class CarreraPilotoComponent implements OnInit {
  carre: Carreras[] = [];

  carr = {
    idCarreras: 1,
    temporadaCarrera:" ",
    cantPilCarrera: 1,
    multiplCarrera: 1,
    fechaCarrera: new Date(),
    autodromo: new Autodromos(),
    categorias : new Categorias(),
  }

  constructor(private carServicio:CarrerasService,) { }

  ngOnInit(): void {
    this.traerCarreras();
  }


  public traerCarreras(){
    this.carServicio.obtenerCarrerasOrdenadas().subscribe(dato =>{this.carre = dato});
  }
  public elegir(car:Carreras){
    this.carr.idCarreras =car.idCarreras
    this.carr.autodromo = car.autodromo
    this.carr.cantPilCarrera = car.cantPilCarrera
    this.carr.categorias = car.categorias
    this.carr.fechaCarrera = car.fechaCarrera
    this.carr.multiplCarrera = car.multiplCarrera
    this.carr.temporadaCarrera = car.temporadaCarrera
  };
}
