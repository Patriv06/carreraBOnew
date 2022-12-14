import { PuntosPorCarrera } from './puntos-por-carrera';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntosPorCarreraService {

   private baseURL="https://complete-audry-privas06.koyeb.app/ver/puntPorCarr";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/puntPorCarrera";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/puntPorCarreras/";
  private altaURL="https://complete-audry-privas06.koyeb.app/puntPorCarrera";
  private buscaPpCarUrl = "https://complete-audry-privas06.koyeb.app/ver/puntPorCarrXQYPos";

  /*  private baseURL="http://localhost:8080/ver/puntPorCarr";
  private modifURL ="http://localhost:8080/modif/puntPorCarrera";
  private delURL="http://localhost:8080/delete/puntPorCarreras/";
  private altaURL="http://localhost:8080/puntPorCarrera";
   private buscaPpCarUrl = "http://localhost:8080/ver/puntPorCarrXQYPos"; */
  ppcarr = {
    id: 1,
    puestoPPCarrera:1,
    autosPPCarreras:1,
   puntosPPCarreras:1
  }

  constructor(private httpClient:HttpClient) { }
    obtenerPPCarreras():Observable<PuntosPorCarrera[]>{
    return this.httpClient.get<PuntosPorCarrera[]>(`${this.baseURL}`);
  }

  modificarPPCarreras( ppcarreras:PuntosPorCarrera) {
   return this.httpClient.put<PuntosPorCarrera>(`${this.modifURL}`, ppcarreras)
  }

  borrarPPCarreras(ppcarreras:PuntosPorCarrera){
   return this.httpClient.delete<PuntosPorCarrera>(this.delURL+ ppcarreras.id)
  }
  crearPPCarreras(ppcarreras:PuntosPorCarrera){
    return this.httpClient.post<PuntosPorCarrera>(`${this.altaURL}`, ppcarreras)
  }

  obtenerPPCarrerasPorQAutos(qautos:number, puesto:number):Observable<PuntosPorCarrera[]>{
    return this.httpClient.get<PuntosPorCarrera[]>(`${this.buscaPpCarUrl}`+"?autosPPCarreras=" + qautos +"&"+"puestoPPCarrera=" + puesto);
  }



}
