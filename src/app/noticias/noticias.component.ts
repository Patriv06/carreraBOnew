import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from './noticias';
import { NoticiasService } from './noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  pages: number = 1;
  notic: Noticias[]=[
    {
      id: 1,
      fechaNoticia:new Date('01-12-2021'),
      cuerpoNoticia:'Esta es la noticia numero 1 de este fin de semana alocado'
    },
    {
      id: 2,
      fechaNoticia:new Date('02-03-2022'),
      cuerpoNoticia:'esta es la noticia numero dos donde bal bal bal aksfa sdfartqe faqerfar tadrgsf dg shs ghsf ghdfgt'
    }
  ]

  constructor(private notiServicio:NoticiasService, private router:Router ) { }

  ngOnInit(): void {
    this.traerNoticias();
  }

  not = {
    id: 1,
    fechaNoticia:new Date(),
    cuerpoNoticia:''
  }

  public traerNoticias(){
    this.notiServicio.obtenerNoticias().subscribe(dato =>{this.notic = dato});
  }

  public modifNoticias(not:Noticias){
    if (not.cuerpoNoticia != " "){
      this.notiServicio.modificarNoticias(not).subscribe(()=>this.traerNoticias())
    }else{
      alert("El nombre no puede estar en blanco")
    }
  }

  public delNoticias(noticias:Noticias):void{
  this.notiServicio.borrarNoticias(noticias).subscribe(()=>this.traerNoticias());
  }

  public altaNoticias(not:Noticias){
    if (not.cuerpoNoticia != " "){
      this.notiServicio.crearNoticias(not).subscribe((dato: {id:number; fechaNoticia: Date; cuerpoNoticia: string}) =>this.traerNoticias());
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




