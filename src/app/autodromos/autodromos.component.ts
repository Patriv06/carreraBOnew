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
  aut!: Autodromos[];
  autod = {
    id:1,
    nombreAutodromo:" ",
   
    }

   


  constructor(private autodromosServicio:AutodromosService) { }
  
  ngOnInit(): void {
     this.traerAutodromos();
  
  }
  
  private traerAutodromos(){
   this.autodromosServicio.obtenerAutodromos().subscribe(dato =>{this.aut = dato})
   
    console.log(this.aut);
    }
    public modifAutodromos(aut:Autodromos){
      if (aut.nombreAutodromo != " "){
        this.autodromosServicio.modificarAutodromos(aut).subscribe(()=>this.traerAutodromos());
      }
      else{  alert("El nombre no puede estar en blanco")}
      }
    
      public delAutodromos(autodromos:Autodromos):void{
       this.autodromosServicio.borrarAutodromos(autodromos).subscribe(()=>this.traerAutodromos());
      
       
     }
     public altaAutodromos(autod:Autodromos){
      if (autod.nombreAutodromo != " "){
      this.autodromosServicio.crearAutodromos(autod).subscribe((dato: { id: number; nombreAutodromo: string}) =>{autod = dato});
    
      }
      else{  alert("El nombre no puede estar en blanco")}
    }
    recargar(): void {
      window.location.reload();
    }
  
    
    

}
