import { Component, OnInit } from '@angular/core';
import { Autodromos } from '../autodromos/autodromos';
import { AutodromosService } from '../autodromos/autodromos.service';
import { Categorias } from '../categorias/categorias';
import { CategoriasService } from '../categorias/categorias.service';
import { Carreras } from './carreras';
import { CarrerasService } from './carreras.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  pages: number = 1;
  carre: Carreras[] = [];

  constructor(
    private carServicio:CarrerasService,
    private categServicio:CategoriasService,
    private autServicio:AutodromosService ) { }

  ngOnInit(): void {
    this.traerCarreras();
    this.traerCateg();
    this.traerAutod();
  }

  cate: Categorias[] = []

  seleccionado:Categorias=new Categorias();

  aut: Autodromos[]=[]

  selecAut:Autodromos=new Autodromos();

  carr = {
    idCarreras: 1,
    temporadaCarrera:" ",
    cantPilCarrera: 1,
    multiplCarrera: 1,
    fechaCarrera: new Date(),
    autodromo: new Autodromos(),
    categorias : new Categorias(),
  }

  public traerCarreras(){
    this.carServicio.obtenerCarreras().subscribe(dato =>{this.carre = dato});
  }

  public traerCateg(){
    this.categServicio.obtenerCategorias().subscribe(dato =>{this.cate = dato});
  }

  public traerAutod(){
    this.autServicio.obtenerAutodromos().subscribe(dato =>{this.aut = dato});
  }

  public modifCarreras(car:Carreras){
      this.carServicio.modificarCarreras(car).subscribe(()=>this.traerCarreras());
    }

  public delCarreras(carreras:Carreras):void{
    this.carServicio.borrarCarreras(carreras).subscribe(()=>this.traerCarreras());
  }

  public altaCarreras(car:Carreras){

    car.categorias=this.seleccionado
    JSON.stringify(car.categorias)

    car.autodromo=this.selecAut
    JSON.stringify(car.autodromo)

    console.log("carreras desde carr", this.carr)
    console.log("carreras desde car", car)

      this.carServicio.crearCarreras(car).subscribe((dato: {
        idCarreras:number;
        temporadaCarrera:string;
        cantPilCarrera:number;
        multiplCarrera:number;
        fechaCarrera:Date;
        autodromo:Autodromos;
        categorias:Categorias
      }) =>console.log("hola"));

      console.log("car después", car)
  }

  recargar(): void {
    window.location.reload();
  }

  ngOnChange(){
    window.location.reload();
  }
}


