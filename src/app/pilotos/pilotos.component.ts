import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pilotos } from './pilotos';
import { PilotosService } from './pilotos.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent implements OnInit {

  pages: number = 1;
  pilot: Pilotos[] = [
    {
      id: 1,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto1',
      puntajeAntPiloto: 10,
      puntajeActPiloto: 5
    },
    {
      id: 2,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto2',
      puntajeAntPiloto: 109,
      puntajeActPiloto: 45
    },
    {
      id: 3,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto3',
      puntajeAntPiloto: 78,
      puntajeActPiloto: 56
    },
    {
      id: 4,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto4',
      puntajeAntPiloto: 60,
      puntajeActPiloto: 35
    },
    {
      id: 5,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto5',
      puntajeAntPiloto: 81,
      puntajeActPiloto: 30
    },
    {
      id: 6,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto6',
      puntajeAntPiloto: 12,
      puntajeActPiloto: 15
    },
    {
      id: 7,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto7',
      puntajeAntPiloto: 10,
      puntajeActPiloto: 50
    },
    {
      id: 8,
      nombrePiloto: 'Facundo',
      apellidoPiloto: 'Chapur',
      urlImgPiloto: 'http://foto8',
      puntajeAntPiloto: 0,
      puntajeActPiloto: 50
    },
  ]

  constructor(private pilotServicio:PilotosService, private router:Router ) { }

 ngOnInit(): void {
   this.traerPilotos();}

   pil = {
    id:1,
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
if (pil.apellidoPiloto!= " "){

 this.pilotServicio.modificarPilotos(pil).subscribe(()=>this.traerPilotos())
}


else{  alert("El apellido no puede estar en blanco")}

}
public delPilotos(pilotos:Pilotos):void{
 this.pilotServicio.borrarPilotos(pilotos).subscribe(()=>this.traerPilotos());


}
public altaPilotos(pil:Pilotos){
if (pil.apellidoPiloto!= " "){

this.pilotServicio.crearPilotos(pil).subscribe((dato: {id:number; nombrePiloto:string; apellidoPiloto:string; urlImgPiloto:string; puntajeAntPiloto:number; puntajeActPiloto:number}) =>this.traerPilotos());



}
 else{  alert("El nombre no puede estar en blanco")}

}
recargar(): void {
window.location.reload();
}

ngOnChange(){
window.location.reload();
}
}




