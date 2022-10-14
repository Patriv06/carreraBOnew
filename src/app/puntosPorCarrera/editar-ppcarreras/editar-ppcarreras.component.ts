import { PuntosPorCarreraService } from './../puntos-por-carrera.service';
import { PuntosPorCarrera } from './../puntos-por-carrera';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router';
@Component({
  selector: 'app-editar-ppcarreras',
  templateUrl: './editar-ppcarreras.component.html',
  styleUrls: ['./editar-ppcarreras.component.scss']
})
export class EditarPPCarrerasComponent implements OnInit {

  constructor(private ppCarreraServicio:PuntosPorCarreraService, private router:Router,@Inject(MAT_DIALOG_DATA) public data:PuntosPorCarrera,
  private matDialogRef:MatDialogRef<EditarPPCarrerasComponent>) { }

  ngOnInit(): void {
  }

public modifPPCarreras(ppcar:PuntosPorCarrera){

    this.ppCarreraServicio.modificarPPCarreras(ppcar).subscribe(()=>this.mostrarOcultar())
    this.mostrarOcultar()

}
public cerrarMat(){
  this.matDialogRef.close()
}


  mostrarOcultar() {

 window.location.reload();

  }


  }
