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
  auto: Autodromos[] = [
    {
      idAutodromo:1,
      nombreAutodromo: 'cocho lopez'
    },
    {
      idAutodromo:2,
      nombreAutodromo: 'juan de los palotes'
    }
  ];

  constructor(private autServicio:AutodromosService ) { }

  ngOnInit(): void {
    this.traerAutodromo();
  }

  aut = {
    idAutodromo:1,
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
      this.autServicio.crearAutodromos(aut).subscribe((dato: {idAutodromo:number;nombreAutodromo: string}) =>this.traerAutodromo());
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

