import { Autodromos } from 'src/app/autodromos/autodromos';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutodromosService {
  private baseURL="https://complete-audry-privas06.koyeb.app/ver/autodromos";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/autodromos";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/autodromos/";
  private altaURL="https://complete-audry-privas06.koyeb.app/autodromos";

/*   private baseURL="http://localhost:8080/ver/autodromos";
  private modifURL ="http://localhost:8080/modif/autodromos";
  private delURL="http://localhost:8080/delete/autodromos/";
  private altaURL="http://localhost:8080/autodromos"; */


  constructor(private httpClient:HttpClient) { }


  obtenerAutodromosPorId(id:number){
    return this.httpClient.get<Autodromos>(`${this.baseURL}`+"/" + id);
  }
  obtenerAutodromos():Observable<Autodromos[]>{
    return this.httpClient.get<Autodromos[]>(`${this.baseURL}`);
  }

  modificarAutodromos(Autodromos:Autodromos) {
   return this.httpClient.put<Autodromos>(`${this.modifURL}`, Autodromos)
  }

  borrarAutodromos(Autodromos:Autodromos){
   return this.httpClient.delete<Autodromos>(this.delURL+ Autodromos.idAutodromo)
  }
  crearAutodromos(Autodromos:Autodromos){
    return this.httpClient.post<Autodromos>(`${this.altaURL}`, Autodromos)
  }
}


