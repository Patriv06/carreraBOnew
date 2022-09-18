import { Component, OnInit } from '@angular/core';
import { Sponsors } from './sponsors';
import { SponsorsService } from './sponsors.service';

import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent  {
 
  pages: number = 1;
  spo!: Sponsors[];
  spon = {
    sponsorsid:1, 
    nombreSponsor:" ",
    linkSponsor:" ",
    espacioSponsor:" ",
    urlimgSponsor:" "
    }
  images: string[];
  constructor(private storage: Storage, private sponsorsServicio:SponsorsService) {
    this.images = [];
  }
  ngOnInit(){
    this.getImages()
  }
  private traerSponsors(){
    this.sponsorsServicio.obtenerSponsors().subscribe(dato =>{this.spo = dato});
    
     console.log(this.spo);
     }
     public modifSponsors(spo:Sponsors){
       if (spo.nombreSponsor != " "){
         this.sponsorsServicio.modificarSponsors(spo).subscribe(()=>this.traerSponsors());
       }
       else{  alert("El nombre no puede estar en blanco")}
       }
     
       public delSponsors(sponsors:Sponsors):void{
        this.sponsorsServicio.borrarSponsors(sponsors).subscribe(()=>this.traerSponsors());
       
        
      }
    
     public altaSponsors(spon:Sponsors){
      if (spon.nombreSponsor != " "){
        console.log(spon.urlimgSponsor)
      this.sponsorsServicio.crearSponsors(spon).subscribe((dato: { sponsorsid:number; nombreSponsor: string; linkSponsor : string; 
        espacioSponsor: string ;urlimgSponsor :string}) =>this.traerSponsors());
     
      }
      else{  alert("El nombre no puede estar en blanco")}
    }


     recargar(): void {
       window.location.reload();
     } 
    
  
  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);
    this.spon.urlimgSponsor = `images/${file.name}`;
    console.log(this.spon.urlimgSponsor);

    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
    //    this.getImages();
      })
      .catch(error => console.log(error));

  }

  getImages() {
    const imagesRef = ref(this.storage, 'images');
    console.log(this.storage)
    
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

}