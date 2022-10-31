import { PilCatPunt } from './../carrera-piloto/pil-cat-punt';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PilCatPuntService {
  private baseURL="https://back-ranking.herokuapp.com/ver/pilCatPunt";
  private modifURL ="https://back-ranking.herokuapp.com/modif/pilCatPunt";
  private delURL="https://back-ranking.herokuapp.com/delete/pilCatPunt/";
  private altaURL="https://back-ranking.herokuapp.com/pilCatPunt";

/*   private baseURL="http://localhost:8080/ver/pilCatPunt";
  private modifURL ="http://localhost:8080/modif/pilCatPunt";
  private delURL="http://localhost:8080/delete/pilCatPunt/";
  private altaURL="http://localhost:8080/pilCatPunt"; */


  constructor(private httpClient:HttpClient) { }


  obtenerpilCatPuntPorId(id:number){
    return this.httpClient.get<PilCatPunt>(`${this.baseURL}`+"/" + id);
  }
  obtenerPilCatPunt():Observable<PilCatPunt[]>{
    return this.httpClient.get<PilCatPunt[]>(`${this.baseURL}`);
  }

  modificarPilCatPunt(PilCatPunt:PilCatPunt) {
   return this.httpClient.put<PilCatPunt>(`${this.modifURL}`, PilCatPunt)
  }

  borrarPilCatPunt(PilCatPunt:PilCatPunt){
   return this.httpClient.delete<PilCatPunt>(this.delURL+ PilCatPunt.idPilCatPunt)
  }
  crearPilCatPunt(PilCatPunt:PilCatPunt){
    return this.httpClient.post<PilCatPunt>(`${this.altaURL}`, PilCatPunt)
  }
}


