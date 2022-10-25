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

  private baseURL="https://back-ranking.herokuapp.com/ver/carreraPilotos";
  private modifURL ="https://back-ranking.herokuapp.com/modif/carreraPilotos";
  private delURL="https://back-ranking.herokuapp.com/delete/carreraPilotos/";
  private altaURL="https://back-ranking.herokuapp.com/carreraPilotos";

  /* private baseURL="http://localhost:8080/ver/carreraPilotos";
  private modifURL ="http://localhost:8080/modif/carreraPilotos";
  private delURL="http://localhost:8080/delete/carreraPilotos/";
  private altaURL="http://localhost:8080/carreraPilotos"; */
  carr = {
    id: 1,
    temporadaCarrera:" ",
    puestoCarreraPiloto: 1,
    piloto: new Pilotos(),
    carrera: new Carreras(),
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



