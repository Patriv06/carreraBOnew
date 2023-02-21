import { PilotosService } from 'src/app/pilotos/pilotos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { firstValueFrom, lastValueFrom } from 'rxjs';
import { PilCatPunt } from '../carrera-piloto/pil-cat-punt';
import { PilCatPuntService } from '../carrera-piloto/pil-cat-punt.service';
import { Pilotos } from '../pilotos/pilotos';


@Component({
  selector: 'app-calcula-posiciones',
  templateUrl: './calcula-posiciones.component.html',
  styleUrls: ['./calcula-posiciones.component.scss'],
})
export class CalculaPosicionesComponent implements OnInit {
  pilCatPunt: PilCatPunt = {
    idPilCatPunt: 1,
    posActPCP: 0,
    posAntPCP: 0,
    nombrePilotoPilCatPunt:" ",
    idCategoriaPilCatPunt: " ",
    puntosAntPilCantPunt: 1,
    puntosActPilCantPunt: 1,
  };
  pcp: PilCatPunt[] = [];
  pilo : Pilotos[]=[];
  pilo1 : Pilotos[]=[];
  ver = false;
  vez =true
  numero = 1;
  numero1 = 1;
  numero2 = 1;
  totAct = 0;
  totAnt = 0;
  PosAct = 0;
  PosAnt = 0;
  piloto: String = ' ';
  pil = {
    idPiloto:1,
    nombrePiloto:" ",
    apellidoPiloto:" ",
    urlImgPiloto:" ",
    puntajeAntPiloto:0,
    puntajeActPiloto:0
 }
  constructor(private pcpServicio: PilCatPuntService, private router: Router, private pilServicio: PilotosService) {}

  async ngOnInit(): Promise<void> {
   await this.traerPilotos();
  }
  public async traerPilotos() {
    this.pilo = await lastValueFrom( this.pilServicio.obtenerPilotos())
  }
  public vaAHome() {
    this.router.navigateByUrl('home');
  }

public async calcula(){
  this.ver=true
  for (let piloto of this.pilo){
    console.log("aca estoy cargando los puntos: ", piloto)
  /*   var pila= (piloto.nombrePiloto);
    var pilo=pila.trim(); */
    var pilo = piloto.nombrePiloto
    var cat='Puntaje'
    this.pil=piloto
    await this.traePilCatPunt(pilo, cat)
    /* var pila= (piloto.nombrePiloto);
    var pilo=pila.trim(); */
    var pilo = piloto.nombrePiloto
    var cat='Total'

    await this.traePilCatPunt(pilo, cat)
  }
  await this.traePilotosXPuntAct()
  await this.traePilotosXPuntAnt()
  this.numero=99999999999



}

public async traePilotosXPuntAnt(){
  this.pilo1 = await lastValueFrom( this.pilServicio.obtenerPilotosOrdenadosXPAnt())
  await this.grabaXPosAnt()
}

public async grabaXPosAnt(){
  this.numero++
  for(let pil of this.pilo1){
     console.log("estos son los pilotos:", pil)
     await this.traePCPXNombre2(pil.nombrePiloto)
  }
}
  public async traePCPXNombre2(nombre: string){
    this.numero++
    const dato = await firstValueFrom(
      this.pcpServicio.obtenerpilCatPuntPorPil(nombre));
        this.pcp = dato;
       await this.calculaPosAnterior()
       this.numero2++
  }

  public async calculaPosAnterior(){
    for (let pilo of this.pcp){
      this.numero++
      pilo.posAntPCP = this.numero2;
      var dato = await firstValueFrom(this.pcpServicio.modificarPilCatPunt(pilo))
    }
  }


public async traePilotosXPuntAct(){
  this.pilo1 = await lastValueFrom( this.pilServicio.obtenerPilotosOrdenadosXPAct())
  await this.grabaXPosAct()
}

public async grabaXPosAct(){
     this.numero++
     for(let pil of this.pilo1){
        console.log("estos son los pilotos:", pil)
        await this.traePCPXNombre(pil.nombrePiloto)
     }

}
// tengo que crear en el servicio de pcp el buscar por nombre y después armar u for con ese nombre y le pongo el numero y así
//en el back tengo que aginar pilcatpunt por categoria , por posicion y veremos qué mas
public async traePCPXNombre(nombre: string){
  this.numero++
  const dato = await firstValueFrom(
    this.pcpServicio.obtenerpilCatPuntPorPil(nombre));
      this.pcp = dato;
     await this.calculaPosActual()
     this.numero1++
}

public async calculaPosActual(){
  for (let pilo of this.pcp){
    this.numero++
    pilo.posActPCP = this.numero1;
    var dato = await firstValueFrom(this.pcpServicio.modificarPilCatPunt(pilo))
  }
}


//************************************************************************************************************************************** */
//************************************************************************************************************************************** */
//************************************************************************************************************************************** */
/* ********GRABA PUNTOS ACTUALES Y ANTERIORES DESDE PILOTOS A PILCATPUNT EN CATEGORIAS PUNTAJE Y TOTAL*/
public async traePilCatPunt(pilo:string,cate:string){
  this.numero++
  var datoPil:PilCatPunt[] = await firstValueFrom(this.pcpServicio.obtenerpilCatPuntPorPilyCat(pilo,cate));
  console.log("muestro dato:",datoPil[0])

  await this.grabaPilCatPunt(datoPil[0]);
}
//**********************graba puntos actuales y anteriores*********************** */
public async grabaPilCatPunt(Pepet: PilCatPunt) {
  this.numero++
  Pepet.puntosActPilCantPunt = this.pil.puntajeActPiloto
   Pepet.puntosAntPilCantPunt = this.pil.puntajeAntPiloto
   console.log ("   Pepet: ", Pepet.puntosActPilCantPunt)
   console.log ("   Pepet: ", Pepet.puntosAntPilCantPunt)
   console.log('antes de GRABA',Pepet);
try{
const dato = await firstValueFrom(
this.pcpServicio.modificarPilCatPunt(Pepet)
); console.log("grabó bien ", Pepet)} catch(error){ console.error(error)}


console.log('GRABA',Pepet);

}




}
