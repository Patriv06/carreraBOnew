import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pilotos } from './pilotos';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

  private baseURL="https://back-ranking.herokuapp.com/ver/pilotos";
  private modifURL ="https://back-ranking.herokuapp.com/modif/pilotos";
  private delURL="https://back-ranking.herokuapp.com/delete/pilotos/";
  private altaURL="https://back-ranking.herokuapp.com/pilotos";

  /* private baseURL="http://localhost:8080/ver/pilotos";
  private modifURL ="http://localhost:8080/modif/pilotos";
  private delURL="http://localhost:8080/delete/pilotos/";
  private altaURL="http://localhost:8080/pilotos"  */

  pilot = {
     id:1,
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

  modificarPilotos( pilotos:Pilotos) {
  return this.httpClient.put<Pilotos>(`${this.modifURL}`, pilotos)
  }

  borrarPilotos(pilotos:Pilotos){
  return this.httpClient.delete<Pilotos>(this.delURL+ pilotos.id)
  }

  crearPilotos(pilotos:Pilotos){
    return this.httpClient.post<Pilotos>(`${this.altaURL}`, pilotos)
  }
}



