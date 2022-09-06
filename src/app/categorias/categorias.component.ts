import { Component, NgModule, OnInit } from '@angular/core';
import { Categorias } from './categorias';
import { CategoriasService } from './categorias.service';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  pages: number = 1;
  cat!: Categorias[];
  categ = {
    id:1,
    nombreCategoria:" ",
    ponderadorCategoria:0.0,
    linkCategoria:" ",
    }

  constructor(private categoriasServicio:CategoriasService) { }

  ngOnInit(): void {
     this.traerCategorias();
  }

  private traerCategorias(){
    this.categoriasServicio.obtenerCategorias().subscribe(dato =>{this.cat = dato})
      console.log(this.cat);
    }
  public modifCategorias(cat:Categorias){
    if (cat.nombreCategoria != " "){
      this.categoriasServicio.modificarCategorias(cat).subscribe(()=>this.traerCategorias());
      }
    else{  alert("El nombre no puede estar en blanco")}
    }

  public delCategorias(categorias:Categorias):void{
    this.categoriasServicio.borrarCategorias(categorias).subscribe(()=>this.traerCategorias());
    }

  public altaCategorias(catego:Categorias){
    if (catego.nombreCategoria != " "){
      this.categoriasServicio.crearCategorias(catego).subscribe((dato: { id: number; nombreCategoria: string; ponderadorCategoria: number;linkCategoria: string}) =>{catego = dato});
      }
    else{alert("El nombre no puede estar en blanco")}
    }
    recargar(): void {
    window.location.reload();
    }
}
