import { CarreraPiloto } from './carrera-piloto';
import { Carreras } from './../carreras/carreras';
import { Pilotos } from './../pilotos/pilotos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarreraPilotoService {

  private baseURL="https://complete-audry-privas06.koyeb.app/ver/carreraPiloto";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/carreraPiloto";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/carreraPiloto/";
  private altaURL="https://complete-audry-privas06.koyeb.app/carreraPiloto";

  /* private baseURL="http://localhost:8080/ver/carreraPiloto";
  private modifURL ="http://localhost:8080/modif/carreraPiloto";
  private delURL="http://localhost:8080/delete/carreraPiloto/";
  private altaURL="http://localhost:8080/carreraPiloto"; */
  carr = {
    id: 1,
    temporadaCarrera:" ",
    puestoCarreraPiloto: 1,
    pilotos: new Pilotos(),
    carreras: new Carreras(),
  }

  constructor(private httpClient:HttpClient) { }
    obtenerCarreraPilotos():Observable<CarreraPiloto[]>{
    return this.httpClient.get<CarreraPiloto[]>(`${this.baseURL}`);
  }

  modificarCarreraPilotos( carreraPiloto:CarreraPiloto) {
   return this.httpClient.put<CarreraPiloto>(`${this.modifURL}`, carreraPiloto)
  }

  borrarCarreraPiloto(carreraPiloto:CarreraPiloto){
   return this.httpClient.delete<CarreraPiloto>(this.delURL+ carreraPiloto.id)
  }
  crearCarreraPiloto(carreraPiloto:CarreraPiloto){
    return this.httpClient.post<CarreraPiloto>(`${this.altaURL}`, carreraPiloto)
  }
}



