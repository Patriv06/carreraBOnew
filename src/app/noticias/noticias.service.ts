import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticias } from './noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private baseURL="https://complete-audry-privas06.koyeb.app/ver/noticiasOrdenadas";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/noticias";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/noticias/";
  private altaURL="https://complete-audry-privas06.koyeb.app/noticias";

  /* private baseURL="http://localhost:8080/ver/noticiasOrdenadas";
  private modifURL ="http://localhost:8080/modif/noticias";
  private delURL="http://localhost:8080/delete/noticias/";
  private altaURL="http://localhost:8080/noticias"  */



  not = {
    id: 1,
    fechaNoticia:new Date(),
    cuerpoNoticia: " "

  }

  constructor(private httpClient :HttpClient) { }

  obtenerNoticias():Observable<Noticias[]>{


    return this.httpClient.get<Noticias[]>(`${this.baseURL}`);


  }

  modificarNoticias( noticias:Noticias) {

   return this.httpClient.put<Noticias>(`${this.modifURL}`, noticias)


  }

  borrarNoticias(noticias:Noticias){

   return this.httpClient.delete<Noticias>(this.delURL+ noticias.id)




  }
  crearNoticias(noticias:Noticias){

    return this.httpClient.post<Noticias>(`${this.altaURL}`, noticias)

  }

}


