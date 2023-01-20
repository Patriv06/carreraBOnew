import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pilotos } from './pilotos';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

   private baseURL="https://complete-audry-privas06.koyeb.app/ver/pilotos";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/pilotos";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/pilotos/";
  private altaURL="https://complete-audry-privas06.koyeb.app/pilotos";
  private buscaPilXnom ="https://complete-audry-privas06.koyeb.app/ver/pilotosXnombre"
  private buscaPilXPuntAct ="https://complete-audry-privas06.koyeb.app/ver/pilOrdenPunAct"
  private buscaPilXPuntAnt ="https://complete-audry-privas06.koyeb.app/ver/pilOrdenPunAnt"

  // private baseURL="http://localhost:8080/ver/pilotos";
  // private modifURL ="http://localhost:8080/modif/pilotos";
  // private delURL="http://localhost:8080/delete/pilotos/";
  // private altaURL="http://localhost:8080/pilotos"

  pilot = {
    idPiloto:1,
    nombrePiloto:" ",
    apellidoPiloto:" ",
    urlImgPiloto:" ",
    puntajeAntPiloto:1,
    puntajeActPiloto:1
  }

  constructor(private httpClient :HttpClient) { }

  obtenerPilotos():Observable<Pilotos[]>{
    return this.httpClient.get<Pilotos[]>(`${this.baseURL}`);
  }

  modificarPilotos(pilotos:Pilotos) {
  return this.httpClient.put<Pilotos>(`${this.modifURL}`, pilotos)
  }

  borrarPilotos(pilotos:Pilotos){
  return this.httpClient.delete<Pilotos>(this.delURL+ pilotos.idPiloto)
  }

  crearPilotos(pilotos:Pilotos){
    return this.httpClient.post<Pilotos>(`${this.altaURL}`, pilotos)
  }

  obtenerPilotosXnombre(nom:String):Observable<Pilotos>{
    return this.httpClient.get<Pilotos>(`${this.buscaPilXnom}`+"/" + nom);
  }


  obtenerPilotosOrdenadosXPAct():Observable<Pilotos[]>{
    return this.httpClient.get<Pilotos[]>(`${this.buscaPilXPuntAct}`);
  }

  obtenerPilotosOrdenadosXPAnt():Observable<Pilotos[]>{
    return this.httpClient.get<Pilotos[]>(`${this.buscaPilXPuntAnt}`);
  }

}



