import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autodromos } from './autodromos';

@Injectable({
  providedIn: 'root'
})
export class AutodromosService {
  private baseURL="https://back-ranking.herokuapp.com/ver/autodromos";
  private modifURL ="https://back-ranking.herokuapp.com/modif/autodromos";
  private delURL="https://back-ranking.herokuapp.com/delete/autodromos/";
  private altaURL="https://back-ranking.herokuapp.com/autodromos";

  aut = {
    id:1,
    nombreAutodromo:" ",
  }

  constructor(private httpClient:HttpClient) { }
    obtenerAutodromos():Observable<Autodromos[]>{
    return this.httpClient.get<Autodromos[]>(`${this.baseURL}`);
  }

  modificarAutodromos( autodromos:Autodromos) {
   return this.httpClient.put<Autodromos>(`${this.modifURL}`, autodromos)
  }

  borrarAutodromos(autodromos:Autodromos){
   return this.httpClient.delete<Autodromos>(this.delURL+ autodromos.id)
  }
  crearAutodromos(autodromos:Autodromos){
    return this.httpClient.post<Autodromos>(`${this.altaURL}`, autodromos)
  }
}


