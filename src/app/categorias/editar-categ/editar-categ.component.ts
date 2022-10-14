import { Categorias } from './../categorias';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-editar-categ',
  templateUrl: './editar-categ.component.html',
  styleUrls: ['./editar-categ.component.scss']
})
export class EditarCategComponent implements OnInit {

  constructor(private categServicio:CategoriasService, private router:Router,@Inject(MAT_DIALOG_DATA) public data:Categorias,
  private matDialogRef:MatDialogRef<EditarCategComponent>) { }

  ngOnInit(): void {
  }

  public modifCategorias(cat:Categorias){
    console.log("estoy en modif", cat)

    this.categServicio.modificarCategorias(cat).subscribe(()=>this.mostrarOcultar())
   this.mostrarOcultar()
}

public cerrarMat(){
  this.matDialogRef.close()
}


  mostrarOcultar() {

 window.location.reload();




  }
}



/*   public modifCategorias(cat:Categorias){
    if (cat.idCategoria != " "){
      this.categServicio.modificarCategorias(cat).subscribe(()=>this.traerCategorias())
    }else{
      alert("El nombre no puede estar en blanco")
    }
  }  */




