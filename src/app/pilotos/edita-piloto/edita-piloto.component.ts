import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autodromos } from 'src/app/autodromos/autodromos';
import { EditarAutComponent } from 'src/app/autodromos/editar-aut/editar-aut.component';
import { Pilotos } from '../pilotos';
import { PilotosService } from '../pilotos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-edita-piloto',
  templateUrl: './edita-piloto.component.html',
  styleUrls: ['./edita-piloto.component.scss']
})
export class EditaPilotoComponent implements OnInit {

  constructor(private pilotServicio:PilotosService, private router:Router,@Inject(MAT_DIALOG_DATA) public data:Pilotos,
  private matDialogRef:MatDialogRef<EditaPilotoComponent> ) { }

  ngOnInit(): void {
  }

  public modifPilotos(pil:Pilotos){
    if (pil.nombrePiloto!= " "){
      this.pilotServicio.modificarPilotos(pil).subscribe(()=>this.mostrarOcultar())
      this.mostrarOcultar()
    }else{
      alert("El Nombre no puede estar en blanco")
    }
  }
  public cerrarMat(){
    this.matDialogRef.close()
  }


    mostrarOcultar() {

   window.location.reload();




    }

}
