import { Component, NgModule, OnInit } from '@angular/core';
import { Categorias } from './categorias';
import { CategoriasService } from './categorias.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  pages: number = 1;
  cate: Categorias[] = [
    {
      id:1,
      idCategoria:'PC A',
      nombreCategoria:'Pro Car 4000 Clase A',
      ponderadorCategoria:0.2,
      linkCategoria: 'http://procar4000.com.ar/procar_4000/index.php/2013-01-31-06-54-32/posiciones'
    },
    {
      id:2,
      idCategoria:'PC B',
      nombreCategoria:'Pro Car 4000 Clase B',
      ponderadorCategoria:0.5,
      linkCategoria: 'http://procar4000.com.ar/procar_4000/index.php/2013-01-31-07-00-49/posiciones'
    },
    {
      id:3,
      idCategoria:'T2000',
      nombreCategoria:'TC2000',
      ponderadorCategoria:0.9,
      linkCategoria: 'www.supertc2000.com.ar'
    },
    {
      id:4,
      idCategoria:'TC',
      nombreCategoria:'Turismo Carretera',
      ponderadorCategoria:1,
      linkCategoria: 'https://actc.org.ar/tc/index.html'
    },
    {
      id:5,
      idCategoria:'2000S',
      nombreCategoria:'TC2000 Series',
      ponderadorCategoria:0.5,
      linkCategoria: 'www.tc2000.com.ar'
    },
    {
      id:6,
      idCategoria:'TCM',
      nombreCategoria:'TC Mouras',
      ponderadorCategoria:0.3,
      linkCategoria: 'https://actc.org.ar/tcm/index.html'
    },
    {
      id:7,
      idCategoria:'TN C2',
      nombreCategoria:'Turismo Nacional Clase 2',
      ponderadorCategoria:0.4,
      linkCategoria: 'https://www.apat.org.ar/posiciones/2'
    },
  ]

  constructor(private categServicio:CategoriasService, private router:Router ) { }

 ngOnInit(): void {
   this.traerCategorias();}



cat = {
  id:1,
  idCategoria:'',
  nombreCategoria:'',
  ponderadorCategoria: 0,
  linkCategoria:''
}



public traerCategorias(){
this.categServicio.obtenerCategorias().subscribe(dato =>{this.cate = dato});

}
public modifCategorias(cat:Categorias){
if (cat.idCategoria != " "){

 this.categServicio.modificarCategorias(cat).subscribe(()=>this.traerCategorias())
}


else{  alert("El nombre no puede estar en blanco")}

}
public delCategorias(categorias:Categorias):void{
 this.categServicio.borrarCategorias(categorias).subscribe(()=>this.traerCategorias());


}
public altaCategorias(cate:Categorias){
if (cate.idCategoria != " "){

this.categServicio.crearCategorias(cate).subscribe((dato: {id:number; idCategoria: string; nombreCategoria: string; ponderadorCategoria: number; linkCategoria: string}) =>this.traerCategorias());
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

