import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Categorias } from './categorias';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

   private baseURL="https://complete-audry-privas06.koyeb.app/ver/categorias";
  private modifURL ="https://complete-audry-privas06.koyeb.app/modif/categorias";
  private delURL="https://complete-audry-privas06.koyeb.app/delete/categorias/";
  private altaURL="https://complete-audry-privas06.koyeb.app/categorias";
  private buscaURL = "https://complete-audry-privas06.koyeb.app/ver/catXIdCat";

/*    private baseURL="http://localhost:8080/ver/categorias";
  private modifURL ="http://localhost:8080/modif/categorias";
  private delURL="http://localhost:8080/delete/categorias/";
  private altaURL="http://localhost:8080/categorias"   */

  cat = {
    idCat:1,
    idCategoria:" ",
    nombreCategoria:" ",
    ponderadorCategoria: 0,
    linkCategoria:" ",
  }

  constructor(private httpClient :HttpClient) { }

  obtenerCategorias():Observable<Categorias[]>{
    return this.httpClient.get<Categorias[]>(`${this.baseURL}`);
  }

  modificarCategorias( categorias:Categorias) {
    return this.httpClient.put<Categorias>(`${this.modifURL}`, categorias)
  }

  borrarCategorias(categorias:Categorias){
    return this.httpClient.delete<Categorias>(this.delURL+ categorias.idCat)
  }

  crearCategorias(categorias:Categorias){
    return this.httpClient.post<Categorias>(`${this.altaURL}`, categorias)
  }
  buscaCategorias(idCat:String):Observable<Categorias>{
    return this.httpClient.get<Categorias>(`${this.buscaURL}`+"?idCategoria="+ idCat);
  }



}


