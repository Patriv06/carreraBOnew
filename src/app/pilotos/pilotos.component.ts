import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pilotos } from './pilotos';
import { PilotosService } from './pilotos.service';
import { MatDialog } from '@angular/material/dialog'
import { EditaPilotoComponent } from './edita-piloto/edita-piloto.component';
@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent implements OnInit {

  pages: number = 1;
  pilot: Pilotos[] = []

  constructor(private pilotServicio:PilotosService, private  router:Router ,private matDialog:MatDialog ) { }

  ngOnInit(): void {
    this.traerPilotos();
  }

  pil = {
    idPiloto:1,
    nombrePiloto:" ",
    apellidoPiloto:" ",
    urlImgPiloto:" ",
    puntajeAntPiloto:1,
    puntajeActPiloto:1
 }

  public traerPilotos(){
    this.pilotServicio.obtenerPilotos().subscribe(dato =>{this.pilot = dato});
  }
  public modifPilotos(pil:Pilotos){


    let dialogRef = this.matDialog.open(EditaPilotoComponent, {

     data:pil,
     width:"800px",
     disableClose:true

   });

   dialogRef.afterClosed().subscribe(result => {this.recargar()});

  }




  public delPilotos(pilotos:Pilotos):void{
    this.pilotServicio.borrarPilotos(pilotos).subscribe(()=>this.traerPilotos());
  }

  public altaPilotos(pil:Pilotos){
    if (pil.apellidoPiloto!= " "){
      this.pilotServicio.crearPilotos(pil).subscribe((dato: {idPiloto:number; nombrePiloto:string; apellidoPiloto:string; urlImgPiloto:string; puntajeAntPiloto:number; puntajeActPiloto:number}) =>this.traerPilotos());
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




