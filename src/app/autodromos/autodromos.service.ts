import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autodromos} from './autodromos';



@Injectable({
  providedIn: 'root'
})
export class AutodromosService {
  private baseURL="http://localhost:8080/ver/autodromo";
  private modifURL ="http://localhost:8080/modif/autodromo";
  private delURL="http://localhost:8080/delete/autodromo/";
  private altaURL="http://localhost:8080/autodromo"
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
