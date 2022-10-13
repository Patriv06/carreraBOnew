

import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { AutodromosService } from '../autodromos.service';

import { TransferState } from '@angular/platform-browser';
import { Autodromos } from '../autodromos';


@Component({
  selector: 'app-editar-aut',
  templateUrl: './editar-aut.component.html',
  styleUrls: ['./editar-aut.component.scss']
})
export class EditarAutComponent implements OnInit {

  constructor(private autServicio:AutodromosService, private router:Router ) { }

 public mostrar:boolean=true

  aut!:Autodromos
  auto: Autodromos[] = [
    {
      idAutodromo:1,
      nombreAutodromo: ''
    }

  ];
  public listaAut:Array<any> =[]
  ngOnInit(): void {


 this.Traer();



  }

public Traer(){ this.autServicio.mandaParaModificar.subscribe(data =>{this.listaAut.push(data);
});}

  public modifAutodromo(aut:Autodromos){
      console.log("estoy en modif", aut)

      this.autServicio.modificarAutodromos(aut).subscribe(()=>this.mostrarOcultar())
     this.mostrarOcultar()
  }

  Editar(){
      let id = JSON.parse(localStorage.getItem("id") || "");
      this.autServicio.obtenerAutodromoPorId(id)
      .subscribe(data=>{
        this.aut=data;
      })
    }


  mostrarOcultar() {
   this.mostrar=false
 window.location.reload();




  }
}
