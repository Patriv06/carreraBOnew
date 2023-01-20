import { PilCatPuntService } from './../carrera-piloto/pil-cat-punt.service';
import { PilotosService } from 'src/app/pilotos/pilotos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../categorias/categorias.service';
import { Categorias } from '../categorias/categorias';
import { Pilotos } from '../pilotos/pilotos';
import { PilCatPunt } from '../carrera-piloto/pil-cat-punt';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-genera-cat-en-cero',
  templateUrl: './genera-cat-en-cero.component.html',
  styleUrls: ['./genera-cat-en-cero.component.scss']
})
export class GeneraCatEnCeroComponent implements OnInit {
  cate: Categorias[] = []
  pilot: Pilotos[] = []
  pcp: PilCatPunt[] = [];
  ordenado: PilCatPunt[] = [];
  pilCatPunt :PilCatPunt={
    idPilCatPunt:1,
    posActPCP:0,
    posAntPCP:0,

    nombrePilotoPilCatPunt:"",
    idCategoriaPilCatPunt:"",
    puntosAntPilCantPunt:1,
    puntosActPilCantPunt:1,
  };
  ver = false;
  numero=0
  constructor(private categServicio:CategoriasService, private router:Router,private pilotServicio:PilotosService,private pcpServicio:PilCatPuntService ) { }

  ngOnInit(): void {
    this.traerCategorias();
    this.traerPilCatPunt();
    this.traerPilotos();
  }

  public traerCategorias(){
    this.categServicio.obtenerCategorias().subscribe(dato =>{this.cate = dato});
  }
  public traerPilotos(){
    this.pilotServicio.obtenerPilotos().subscribe(dato =>{this.pilot = dato});
  }
  public traerPilCatPunt(){
    this.pcpServicio.obtenerPilCatPunt().subscribe(dato =>{this.pcp = dato});
  }
  public async poneEnCero(){
    this.ver = true
    this.numero = this.numero + 1
    console.log("Pone en cero")
    for (let pil of this.pcp){
      this.pcpServicio.borrarPilCatPunt(pil).subscribe(()=>console.log("borrando", pil))
    }

    for (let pil of this.pilot){

        this.pilCatPunt.posActPCP = 0;
        this.pilCatPunt.posActPCP=0;
        this.pilCatPunt.puntosAntPilCantPunt = 0;
        this.pilCatPunt.puntosActPilCantPunt = 0;
        this.pilCatPunt.nombrePilotoPilCatPunt = pil.nombrePiloto;
        this.pilCatPunt.idCategoriaPilCatPunt = "Puntaje";
        await this.grabaPilCatPunt(this.pilCatPunt)
      for (let cat of this.cate){
        this.pilCatPunt.posActPCP = 0;
        this.pilCatPunt.posActPCP=0;
        this.pilCatPunt.puntosAntPilCantPunt = 0;
        this.pilCatPunt.puntosActPilCantPunt = 0;
        this.pilCatPunt.nombrePilotoPilCatPunt = pil.nombrePiloto;
        this.pilCatPunt.idCategoriaPilCatPunt = cat.idCategoria;
        await this.grabaPilCatPunt(this.pilCatPunt)

      }
      this.pilCatPunt.posActPCP = 0;
      this.pilCatPunt.posActPCP=0;
      this.pilCatPunt.puntosAntPilCantPunt = 0;
      this.pilCatPunt.puntosActPilCantPunt = 0;
      this.pilCatPunt.nombrePilotoPilCatPunt = pil.nombrePiloto;
      this.pilCatPunt.idCategoriaPilCatPunt = "Total";
      await this.grabaPilCatPunt(this.pilCatPunt)
    }
    this.pcp.sort()
    console.log (this.pcp)
     this.numero = 99999999999
  }
  async grabaPilCatPunt(PilCatPunt:PilCatPunt){

    console.log("Estoy en grabaPilCatPunt", this.pilCatPunt)
    const dato = await firstValueFrom(this.pcpServicio.crearPilCatPunt(this.pilCatPunt))
      //.subscribe((dato: { idPilCatPunt: number; nombrePilotoPilCatPunt: String; idCategoriaPilCatPunt: String; puntosAntPilCantPunt: number; puntosActPilCantPunt: number; }) => console.log("creó PilCatPunt", this.pcp, dato));
      this.numero = this.numero + 1
    }
  public vaAHome(){
    this.router.navigateByUrl('home');
  }
}
