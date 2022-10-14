import { EditarAutComponent } from './editar-aut/editar-aut.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Autodromos } from './autodromos';
import { AutodromosService } from './autodromos.service';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-autodromos',
  templateUrl: './autodromos.component.html',
  styleUrls: ['./autodromos.component.scss']
})

export class AutodromosComponent implements OnInit {
  pages: number = 1;


  auto: Autodromos[] = [

  ];

  constructor(private autServicio:AutodromosService, private router:Router,private matDialog:MatDialog ) { }
  public mostrar: boolean = true;
  ngOnInit(): void {
    this.traerAutodromo();
  }

  aut = {
    idAutodromo:1,
    nombreAutodromo:'',
  }

  public traerAutodromo(){
    this.autServicio.obtenerAutodromos().subscribe(dato =>{this.auto = dato});
  }

  public modifAutodromo(aut:Autodromos){


 let dialogRef = this.matDialog.open(EditarAutComponent, {

  data:aut,
  width:"700px",
  disableClose:true

});

dialogRef.afterClosed().subscribe(result => {this.recargar()

});

  }




  public delAutodromo(autodromos:Autodromos):void{
    this.autServicio.borrarAutodromos(autodromos).subscribe();
  }

  public altaAutodromos(aut:Autodromos){
    if (aut.nombreAutodromo != " "){
      this.autServicio.crearAutodromos(aut).subscribe((dato: {idAutodromo:number;nombreAutodromo: string}) =>this.traerAutodromo());
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

