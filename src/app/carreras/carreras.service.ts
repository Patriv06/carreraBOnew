import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autodromos } from '../autodromos/autodromos';
import { Categorias } from '../categorias/categorias';
import { Carreras } from './carreras';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private baseURL="https://complete-audry-privas06.koyeb.app/ver/carreras";
  private baseURLORDENADA="https://complete-audry-privas06.koyeb.app/ver/carrerasOrdenadas";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/carreras";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/carreras/";
  private altaURL="https://complete-audry-privas06.koyeb.app/carreras";

  /* private baseURL="http://localhost:8080/ver/carreras";
  private modifURL ="http://localhost:8080/modif/carreras";
  private delURL="http://localhost:8080/delete/carreras/";
  private altaURL="http://localhost:8080/carreras"; */
  carr = {
    idCarreras: 1,
    temporadaCarrera:" ",
    cantPilCarrera: 1,
    multiplCarrera: 1,
    fechaCarrera: new Date(),
    autodromo: new Autodromos(),
    categorias: new Categorias(),
  }

  constructor(private httpClient:HttpClient) { }

  obtenerCarreras():Observable<Carreras[]>{
    return this.httpClient.get<Carreras[]>(`${this.baseURL}`);
  }
  obtenerCarrerasOrdenadas():Observable<Carreras[]>{
    return this.httpClient.get<Carreras[]>(`${this.baseURLORDENADA}`);
  }
  modificarCarreras( carreras:Carreras) {
   return this.httpClient.put<Carreras>(`${this.modifURL}`, carreras)
  }

  borrarCarreras(carreras:Carreras){
   return this.httpClient.delete<Carreras>(this.delURL+ carreras.idCarreras)
  }
  crearCarreras(carreras:Carreras){
    return this.httpClient.post<Carreras>(`${this.altaURL}`, carreras)
  }
}



