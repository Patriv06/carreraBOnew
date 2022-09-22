import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Sponsors } from './sponsors';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  private baseURL="https://back-ranking.herokuapp.com/ver/sponsors";
  private modifURL ="https://back-ranking.herokuapp.com/modif/sponsors";
  private delURL="https://back-ranking.herokuapp.com/delete/sponsors/";
  private altaURL="https://back-ranking.herokuapp.com/sponsors";  


  /* private baseURL="http://localhost:8080/ver/sponsors";
  private modifURL ="http://localhost:8080/modif/sponsors";
  private delURL="http://localhost:8080/delete/sponsors/";
  private altaURL="http://localhost:8080/sponsors" */
 

  spo = {
    id:1, 
    nombreSponsor:" ",
    linkSponsor:" ",
    espacioSponsor:" ",
    urlimgSponsor:" "
  }

 // images: string;
constructor(private httpClient:HttpClient) 
{
  //this.images = " ";
 }
  
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
 
  /* getImages() {
    const imagesRef = ref(this.storage, 'images');
    console.log(this.storage)
    
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = " ";
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.match(url);
        }
      })
      .catch(error => console.log(error));
  } */
}
