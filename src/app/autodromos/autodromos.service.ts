import { Autodromos } from 'src/app/autodromos/autodromos';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { throwError } from 'rxjs';

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
  manejoDeErrores(error: HttpErrorResponse){

    return error.message
  }

  obtenerAutodromosPorId(id:number){
    return this.httpClient.get<Autodromos>(`${this.baseURL}`+"/" + id).pipe(catchError(this.manejoDeErrores));
  }
  obtenerAutodromos():Observable<Autodromos[]>{
    return this.httpClient.get<Autodromos[]>(`${this.baseURL}`);
  }

  modificarAutodromos(Autodromos:Autodromos) {
   return this.httpClient.put<Autodromos>(`${this.modifURL}`, Autodromos).pipe(catchError(this.manejoDeErrores))
  }

  borrarAutodromos(Autodromos:Autodromos){
   return this.httpClient.delete<Autodromos>(this.delURL+ Autodromos.idAutodromo).pipe(catchError(this.manejoDeErrores))
  }
  crearAutodromos(Autodromos:Autodromos){
    return this.httpClient.post<Autodromos>(`${this.altaURL}`, Autodromos)
  }
}


