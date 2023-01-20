import { PilCatPunt } from './../carrera-piloto/pil-cat-punt';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PilCatPuntService {
  private baseURL="https://complete-audry-privas06.koyeb.app/ver/pilCatPunt";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/pilCatPunt";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/pilCatPunt/";
  private altaURL="https://complete-audry-privas06.koyeb.app/pilCatPunt";
  private buscaPilUrl = "https://complete-audry-privas06.koyeb.app/ver/pilCatPuntXPiloto/";
  private buscaPilYCatURL = "https://complete-audry-privas06.koyeb.app/ver/pilCatPuntXPilotoYXCategoria";
  private buscaPCPXPuntAct = "https://complete-audry-privas06.koyeb.app/ver/pcpOrdenadoXPuntAct";
  private buscaPCPXPuntAnt = "https://complete-audry-privas06.koyeb.app/ver/pcpOrdenadoXPuntAnt";


/*   private baseURL="http://localhost:8080/ver/pilCatPunt";
  private modifURL ="http://localhost:8080/modif/pilCatPunt";
  private delURL="http://localhost:8080/delete/pilCatPunt/";
  private altaURL="http://localhost:8080/pilCatPunt"; */


  constructor(private httpClient:HttpClient) { }


  obtenerpilCatPuntPorId(id:number){
    return this.httpClient.get<PilCatPunt>(`${this.baseURL}`+"/" + id);
  }


  obtenerpilCatPuntPorPil(nombrePil:String):Observable<PilCatPunt[]>{
    return this.httpClient.get<PilCatPunt[]>(`${this.buscaPilUrl}`+ nombrePil);
  }

  obtenerpilCatPuntPorPilyCat(nombrePil:String, nombreCat:String):Observable<PilCatPunt[]>{
    return this.httpClient.get<PilCatPunt[]>(`${this.buscaPilYCatURL}`+"?nombrePilotoPilCatPunt=" + nombrePil +"&"+"idCategoriaPilCatPunt=" + nombreCat);

  }

  obtenerPilCatPunt():Observable<PilCatPunt[]>{
    return this.httpClient.get<PilCatPunt[]>(`${this.baseURL}`);
  }

  obtenerPCPXPuntact():Observable<PilCatPunt[]>{
    return this.httpClient.get<PilCatPunt[]>(`${this.buscaPCPXPuntAct}`);
  }

  obtenerPCPXPuntant():Observable<PilCatPunt[]>{
    return this.httpClient.get<PilCatPunt[]>(`${this.buscaPCPXPuntAnt}`);
  }

  modificarPilCatPunt(pilCatPunt:PilCatPunt){
   return this.httpClient.put<PilCatPunt>(`${this.modifURL}`, pilCatPunt)
  }

  borrarPilCatPunt(pilCatPunt:PilCatPunt){
   return this.httpClient.delete<PilCatPunt>(this.delURL+ pilCatPunt.idPilCatPunt)
  }
  crearPilCatPunt(pilCatPunt:PilCatPunt){
    return this.httpClient.post<PilCatPunt>(`${this.altaURL}`, pilCatPunt)
  }
}


