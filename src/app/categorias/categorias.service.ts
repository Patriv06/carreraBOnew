import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Categorias } from './categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private baseURL="https://back-ranking.herokuapp.com/ver/categorias";
  private modifURL ="https://back-ranking.herokuapp.com/modif/categorias";
  private delURL="https://back-ranking.herokuapp.com/delete/categorias/";
  private altaURL="https://back-ranking.herokuapp.com/categorias";  

 /*   private baseURL="http://localhost:8080/ver/categorias";
  private modifURL ="http://localhost:8080/modif/categorias";
  private delURL="http://localhost:8080/delete/categorias/";
  private altaURL="http://localhost:8080/categorias"  */



  cat = {
    id:1,
    idCategoria:" ",
    nombreCategoria:" ",
    ponderadorCategoria:0.5,
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
   
   return this.httpClient.delete<Categorias>(this.delURL+ categorias.id)



   
  }
  crearCategorias(categorias:Categorias){
   
    return this.httpClient.post<Categorias>(`${this.altaURL}`, categorias)
  
  }

}


