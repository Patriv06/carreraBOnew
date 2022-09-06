import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsors } from './sponsors';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  private baseURL="http://localhost:8080/ver/sponsors";
  private modifURL ="http://localhost:8080/modif/sponsors";
  private delURL="http://localhost:8080/delete/sponsors/";
  private altaURL="http://localhost:8080/sponsors"
  spon = {
    id:1,
    logoSponsor:"",
    linkSponsor:" ",
    espacioSponsor:" ",

  }

  constructor(private httpClient:HttpClient) { }

  obtenerSponsors():Observable<Sponsors[]>{


    return this.httpClient.get<Sponsors[]>(`${this.baseURL}`);


  }

  modificarSponsors( sponsors:Sponsors) {

   return this.httpClient.put<Sponsors>(`${this.modifURL}`, sponsors)


  }

  borrarSponsors(sponsors:Sponsors){

   return this.httpClient.delete<Sponsors>(this.delURL+ sponsors.id)




  }
  crearSponsors(sponsors:Sponsors){

    return this.httpClient.post<Sponsors>(`${this.altaURL}`, sponsors)

  }

}
