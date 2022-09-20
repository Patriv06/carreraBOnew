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
export class SponsorsComponent implements OnInit {
 
  pages: number = 1;
  spo!: Sponsors[];
  spon = {
    id:1, 
    nombreSponsor:" ",
    linkSponsor:" ",
    espacioSponsor:" ",
    urlimgSponsor:" "
  }

  constructor(private sponServicio:SponsorsService ) { }

 ngOnInit(): void {
   this.traerSponsors();

 }
public traerSponsors(){
this.sponServicio.obtenerSponsors().subscribe(dato =>{this.spo = dato});

}
public modifSponsors(spo:Sponsors){
if (spo.nombreSponsor != " "){
 
 this.sponServicio.modificarSponsors(spo).subscribe(()=>this.traerSponsors())
}


else{  alert("El nombre no puede estar en blanco")}

}
public delSponsors(sponsors:Sponsors):void{
 this.sponServicio.borrarSponsors(sponsors).subscribe(()=>this.traerSponsors());
 
 
}
public altaSponsors(spo:Sponsors){
if (spo.nombreSponsor != " "){ 
  
this.sponServicio.crearSponsors(spo).subscribe((dato: {id:number;nombreSponsor: string; linkSponsor: string; espacioSponsor:string; urlimgSponsor:string}) =>this.traerSponsors());


}
 else{  alert("El nombre no puede estar en blanco")}

}
recargar(): void {
window.location.reload();
}

ngOnChange(){
window.location.reload();
}
}

