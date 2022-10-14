import { Component, NgModule, OnInit } from '@angular/core';
import { Categorias } from './categorias';
import { CategoriasService } from './categorias.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { EditarCategComponent } from './editar-categ/editar-categ.component';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  pages: number = 1;
  cate: Categorias[] = []

  constructor(private categServicio:CategoriasService, private router:Router ,private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.traerCategorias();}

  cat = {
    idCat:1,
    idCategoria:'',
    nombreCategoria:'',
    ponderadorCategoria: 0,
    linkCategoria:''
  }

  public traerCategorias(){
    this.categServicio.obtenerCategorias().subscribe(dato =>{this.cate = dato});
  }
  public modifCategorias(cat:Categorias){


    let dialogRef = this.matDialog.open(EditarCategComponent, {

     data:cat,
     width:"800px",
     disableClose:true

   });

   dialogRef.afterClosed().subscribe(result => {this.recargar()});

  }



  public delCategorias(categorias:Categorias):void{
    this.categServicio.borrarCategorias(categorias).subscribe(()=>this.recargar());
  }

  public altaCategorias(cate:Categorias){
    if (cate.idCategoria != " "){
      this.categServicio.crearCategorias(cate).subscribe((dato: {idCat:number; idCategoria: string; nombreCategoria: string; ponderadorCategoria: number; linkCategoria: string}) =>this.traerCategorias());
    }else{
      alert("El nombre no puede estar en blanco")
    }
  }

  recargar(): void {
    window.location.reload();
  }

  ngOnChange(){
    window.location.reload();
  }
}

