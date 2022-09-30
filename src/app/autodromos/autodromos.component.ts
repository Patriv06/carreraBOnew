import { Component, OnInit } from '@angular/core';
import { Autodromos } from './autodromos';
import { AutodromosService } from './autodromos.service';

@Component({
  selector: 'app-autodromos',
  templateUrl: './autodromos.component.html',
  styleUrls: ['./autodromos.component.scss']
})

export class AutodromosComponent implements OnInit {
  pages: number = 1;
  auto: Autodromos[] = [];

  constructor(private autServicio:AutodromosService ) { }

  ngOnInit(): void {
    this.traerAutodromo();
  }

  aut = {
    id:1,
    nombreAutodromo:'',
  }

  public traerAutodromo(){
    this.autServicio.obtenerAutodromos().subscribe(dato =>{this.auto = dato});
  }

  public modifAutodromo(aut:Autodromos){
    if (aut.nombreAutodromo != " ") {
      this.autServicio.modificarAutodromos(aut).subscribe(
        ()=>this.traerAutodromo()
      )
    }else{
      alert("El nombre no puede estar en blanco")
    }
  }

  public delAutodromo(autodromos:Autodromos):void{
    this.autServicio.borrarAutodromos(autodromos).subscribe(()=>this.traerAutodromo());
  }

  public altaAutodromos(aut:Autodromos){
    if (aut.nombreAutodromo != " "){
      this.autServicio.crearAutodromos(aut).subscribe((dato: {id:number;nombreAutodromo: string}) =>this.traerAutodromo());
    }else{
      alert("El nombre no puede estar en blanco")
    }
  }

  recargar(): void {
    window.location.reload();
  }

  ngOnChange(){
    window.location.reload();
  }
}

