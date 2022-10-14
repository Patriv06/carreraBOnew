

import { Router } from '@angular/router';
import { Component, Inject, Input, OnInit } from '@angular/core';

import { AutodromosService } from '../autodromos.service';

import { Autodromos } from '../autodromos';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'



@Component({
  selector: 'app-editar-aut',
  templateUrl: './editar-aut.component.html',
  styleUrls: ['./editar-aut.component.scss']
})
export class EditarAutComponent implements OnInit {

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

    this.autServicio.modificarAutodromos(aut).subscribe(()=>this.mostrarOcultar())
   this.mostrarOcultar()
}

public cerrarMat(){
  this.matDialogRef.close()
}


  mostrarOcultar() {

 window.location.reload();




  }
}
