import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntosPorCarreraService } from './puntos-por-carrera.service';
import { MatDialog } from '@angular/material/dialog'
import { PuntosPorCarrera } from './puntos-por-carrera';
import { EditarPPCarrerasComponent } from './editar-ppcarreras/editar-ppcarreras.component';

@Component({
  selector: 'app-puntos-por-carrera',
  templateUrl: './puntos-por-carrera.component.html',
  styleUrls: ['./puntos-por-carrera.component.scss']
})
export class PuntosPorCarreraComponent implements OnInit {

  pages: number = 1;


  ppCarreras: PuntosPorCarrera[] = [

  ];

  constructor(private ppCarrerasServicio:PuntosPorCarreraService, private router:Router,private matDialog:MatDialog ) { }
  public mostrar: boolean = true;
  ngOnInit(): void {
    this.traerppCarreras();
  }

  ppcarr = {
    id: 1,
    puestoPPCarrera:1,
    autosPPCarreras:1,
   puntosPPCarreras:1
  }

  public traerppCarreras(){
    this.ppCarrerasServicio.obtenerPPCarreras().subscribe(dato =>{this.ppCarreras = dato});
  }

  public modifPPCarreras(ppcar:PuntosPorCarrera){


 let dialogRef = this.matDialog.open(EditarPPCarrerasComponent,
   {

  data:ppcar,
  width:"700px",
  disableClose:true

});

dialogRef.afterClosed().subscribe(result => {this.recargar()

});

  }




  public delPPCarreras(ppCarreras:PuntosPorCarrera):void{
    this.ppCarrerasServicio.borrarPPCarreras(ppCarreras).subscribe();
  }

  public altaPPCarreras(ppcar:PuntosPorCarrera){

      this.ppCarrerasServicio.crearPPCarreras(ppcar).subscribe((dato: {id:number;puestoPPCarrera:number;autosPPCarreras:number;puntosPPCarreras:number}) =>this.traerppCarreras());

  }

  recargar(): void {
    window.location.reload();
  }

  ngOnChange(){
    window.location.reload();
  }
}


