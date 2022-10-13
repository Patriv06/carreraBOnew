import { EditarAutComponent } from './editar-aut/editar-aut.component';
import { Router } from '@angular/router';
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

  ];

  constructor(private autServicio:AutodromosService, private router:Router ) { }
  public mostrar: boolean = true;
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
  // this.mostrar=false
 this.autServicio.mandaParaModificar.emit({data:aut})
 // localStorage.setItem("id", aut.idAutodromo.toString())

   // this.router.navigate(["editarAut"])
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

