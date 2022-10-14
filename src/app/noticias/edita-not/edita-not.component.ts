import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from '../noticias';
import { NoticiasService } from '../noticias.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-edita-not',
  templateUrl: './edita-not.component.html',
  styleUrls: ['./edita-not.component.scss']
})
export class EditaNotComponent implements OnInit {

  constructor(private notServicio:NoticiasService, private router:Router,@Inject(MAT_DIALOG_DATA) public data:Noticias,
  private matDialogRef:MatDialogRef<EditaNotComponent>) { }

  ngOnInit(): void {
  }
  public modifNoticias(not:Noticias){
    if (not.cuerpoNoticia != " "){
      this.notServicio.modificarNoticias(not).subscribe(()=>this.mostrarOcultar())
      this.mostrarOcultar()
    }else{
      alert("El nombre no puede estar en blanco")
    }
  }

public cerrarMat(){
  this.matDialogRef.close()

}

 public mostrarOcultar() {

 window.location.reload();

 }
}
