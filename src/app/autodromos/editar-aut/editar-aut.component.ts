

import { Router } from '@angular/router';
import { Component, Inject, Input, OnInit } from '@angular/core';

import { AutodromosService } from '../autodromos.service';

import { Autodromos } from '../autodromos';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import * as e from 'cors';


@Component({
  selector: 'app-editar-aut',
  templateUrl: './editar-aut.component.html',
  styleUrls: ['./editar-aut.component.scss']
})

export class EditarAutComponent implements OnInit {
  errorMessage=" "

  constructor(private autServicio:AutodromosService, private router:Router,@Inject(MAT_DIALOG_DATA) public data:Autodromos,
           private matDialogRef:MatDialogRef<EditarAutComponent> ) { }


  aut!:Autodromos
  auto: Autodromos[] = [
    {
      idAutodromo:1,
      nombreAutodromo: ''
    }

  ];
  public listaAut:Array<any> =[]
  ngOnInit(): void {



  }

  public modifAutodromo(aut:Autodromos){
    console.log("estoy en modif", aut)

    this.autServicio.modificarAutodromos(aut).subscribe({next: ()=>{console.log("Todo OK")}, error:error=> {
      this.errorMessage = error.message;
      this.mostrarOcultar()

  }
     })


}




public cerrarMat(){
  this.matDialogRef.close()
}


  mostrarOcultar() {
console.log("error:", this.errorMessage)
// window.location.reload();




  }
}
