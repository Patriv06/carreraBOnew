import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autodromos } from './autodromos';

@Injectable({
  providedIn: 'root'
})
export class AutodromosService {

  //private baseURL="https://back-ranking.azurewebsites.net/ver/autodromo";
 // private modifURL ="https://back-ranking.azurewebsites.net/modif/autodromo";
// private delURL="https://back-ranking.azurewebsites.net/delete/autodromo/";
 // private altaURL="https://back-ranking.azurewebsites.net/autodromo"
  private baseURL="http://localhost:8080/ver/autodromos";
  private modifURL ="http://locahost:8080/modif/autodromos";
  private delURL="http://locahost:8080/delete/autodromos/";
  private altaURL="http://localhost:8080/autodromos"
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


