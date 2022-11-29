
import { PuntosPorCarreraService } from './../../puntosPorCarrera/puntos-por-carrera.service';
import { PilCatPuntService } from './../pil-cat-punt.service';
import { CarreraPilotoService } from './../carrera-piloto.service';
import { CarreraPiloto } from './../carrera-piloto';
import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Pilotos } from 'src/app/pilotos/pilotos';
import { PilotosService } from 'src/app/pilotos/pilotos.service';
import { Carreras } from 'src/app/carreras/carreras';
import { PilCatPunt } from '../pil-cat-punt';
import { PuntosPorCarrera } from 'src/app/puntosPorCarrera/puntos-por-carrera';



@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.scss'],
})
export class CargaExcelComponent implements OnInit {

//datoCarrera trae de carrera-piloto todos los datos de la carrera a la cual se le van a cargar los puestos de los pilotos en carPilPunt
  @Input() datoCarrera: any ;

  carr:Carreras[]=[];
  ngOnInit(): void {
    console.log("Estoy en ngonInit")
    console.log ("Dato Carrera: ",this.datoCarrera)
    this.traerPilotos();
    this.buscaPPCarr()

  }

  constructor(
    private pilotServicio: PilotosService,
    private carPilServicio: CarreraPilotoService,
    private pilCPServicio: PilCatPuntService,
    private ppCarrServicio: PuntosPorCarreraService
  ) {}

  ver:boolean=true;
  irA:boolean=false
  posicion : any;
  posicion2 : any;
  resultadosCarrera: any;
  resultadosCarrera2: any;

  pilot: Pilotos[] = [];
  numero: number = 0;
  pilo: Pilotos[] = [
    {
      idPiloto: 1,
      nombrePiloto: ' ',
      apellidoPiloto: ' ',
      urlImgPiloto: ' ',
      puntajeAntPiloto: 1,
      puntajeActPiloto: 1,
    },
  ];
  pilCatPunt :PilCatPunt[]=[ {
    idPilCatPunt:1,
    nombrePilotoPilCatPunt:"",
    idCategoriaPilCatPunt:"",
    puntosAntPilCantPunt:1,
    puntosActPilCantPunt:1,
  }];
  pcp:PilCatPunt ={
    idPilCatPunt:1,
    nombrePilotoPilCatPunt:"",
    idCategoriaPilCatPunt:"",
    puntosAntPilCantPunt:1,
    puntosActPilCantPunt:1,
  }
   pil2 = {
    idPiloto: 1,
    nombrePiloto: ' ',
    apellidoPiloto: ' ',
    urlImgPiloto: ' ',
    puntajeAntPiloto: 1,
    puntajeActPiloto: 1,
  };

  variable1?: String;
  variable2?: String;


  carPil:CarreraPiloto={
     id: 1,
     puestoCarreraPiloto:1,
     pilotos:new  Pilotos,
     carreras: new Carreras
  }
  public pondera!:number;
  public multiplicador!:number;
  public qautos!:number;

  encontro: boolean = false;
  entroPilCatPunt : boolean =false;
  piloto1:String="";
  piloto2:String="";

  ppCarr:PuntosPorCarrera[] =[{id:1,
      puestoPPCarrera:1,
      autosPPCarreras:1,
     puntosPPCarreras:1}]
  puntoXCarrera!: any;
//Acá en buscaPPCarr, genera uno de las claves para buscar en la tabla que tiene los puntos de acuerdo a la cantidad de autos por carrera y la posición en la que salió.
  buscaPPCarr(){
    console.log("Estoy en buscaPPCarr")
    var aut= this.datoCarrera.cantPilCarrera;
    console.log ("Cantidad de Autos:  " , aut)
    this.pondera = this.datoCarrera.categorias.ponderadorCategoria;
    console.log ("muestra PONDERA : ", this.pondera)
    this.multiplicador = this.datoCarrera.multiplCarrera;
    console.log ("multiplicador : ", this.multiplicador);
    if (aut<=10){
    this.qautos = 10}
    if (aut > 10 && aut <=20){
      this.qautos = 20
    }
    if (aut > 20 && aut <=30){
      this.qautos = 30
    }
    if (aut > 30 && aut <=40){
      this.qautos = 40
    }
    if (aut > 40 && aut <=50){
      this.qautos = 50
    }
   console.log("Cantidad de Autos : ", this.qautos)
  }
// Sube el excel y lo lee
  fileUpload(Event: any) {
    console.log("Estoy en fileUpload")
    this.ver = false
    let selectedFile = Event.target.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onloadend = (Event) => {

      let binaryData = Event.target?.result;
      let workbook = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = workbook.SheetNames;
      this.resultadosCarrera = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetNames[0]]
      );

      this.resultadosCarrera2 = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetNames[0]]
      );
      this.ver =false;

      this.recorrerPilotos();
    };
  }

   traerPilotos() {
    console.log("Estoy en traerPilotos")
    this.pilotServicio.obtenerPilotos().subscribe((dato: Pilotos[]) => {
      this.pilot = dato;
    });
  }

  traerPilCatPunt( pil:String, cat:String) {
    console.log("Estoy en traerPilCatPunt")
    console.log ("Estoy en traerPilCatPunt. Pil: ", pil, "cat: " ,cat)
    this.pilCPServicio.obtenerpilCatPuntPorPilyCat(pil, cat).subscribe((dato : PilCatPunt[]) => {this.pilCatPunt= dato;
   console.log("PilCatPunt:", this.pilCatPunt[0].nombrePilotoPilCatPunt); console.log("Entré en ir a buscar traerPPCarrXQautosYPuesto")
   this.traerPPCarrXQautosYPuesto(this.qautos, this.posicion2)
    });
  }
// acá Calcula los puntos y graba o sobreescribe PilCatPunt
  traerPPCarrXQautosYPuesto(Qa:number, pos:number){
    console.log("Estoy en traerPPCarrXQautosYPuesto", Qa, " ", pos)
    this.ppCarrServicio.obtenerPPCarrerasPorQAutos(Qa,pos).subscribe((dato: PuntosPorCarrera[]) => {this.ppCarr = dato;
      this.puntoXCarrera= this.ppCarr[0].puntosPPCarreras;
      this.puntoXCarrera = this.puntoXCarrera * this.pondera * this.multiplicador;
    console.log("puntos por puesto:", this.ppCarr, "  ",this.puntoXCarrera)
    this.pcp.idPilCatPunt = this.pilCatPunt[0].idPilCatPunt
    this.pcp.puntosAntPilCantPunt = this.pilCatPunt[0].puntosActPilCantPunt
    this.pcp.puntosActPilCantPunt = this.pilCatPunt[0].puntosActPilCantPunt + this.puntoXCarrera
    console.log("PCP  :", this.pcp)
// acá tengo que armar todo para que se grabe finalmente pilCatPunt
if (this.pilCatPunt[0].nombrePilotoPilCatPunt != " "){
    this.pilCPServicio.crearPilCatPunt(this.pcp).subscribe((dato: {idPilCatPunt:number;nombrePilotoPilCatPunt: String;idCategoriaPilCatPunt: String;puntosAntPilCantPunt:number;puntosActPilCantPunt:number}) =>console.log("creó PilCatPunt"));
  }
  else {
    this.pilCPServicio.modificarPilCatPunt(this.pcp).subscribe((dato: {idPilCatPunt:number;nombrePilotoPilCatPunt: String;idCategoriaPilCatPunt: String;puntosAntPilCantPunt:number;puntosActPilCantPunt:number}) =>console.log("modificó PilCatPut"));
  }})
}



//recorre pilotos compara los nombres con los del excel, si lo encuentra trae los puntos de tablaPuntos y va a calcular los puntos
   recorrerPilotos() {
    //console.log("Estoy en recorrerPilotos")
    for (let posicion of this.resultadosCarrera2) {
     // console.log(posicion, "Posicion")
      this.encontro = false;
      this.numero = 0
      for (let pil of this.pilot) {
        this.numero = this.numero + 1;
     //   console.log("estoy en pil of this,pilot", this.numero)
        this.piloto1=posicion.Piloto.trim();
        this.piloto2=pil.nombrePiloto.trim();
     //   console.log("Posicion.piloto", this.piloto1);
      //  console.log("pil.nombrePiloto", this.piloto2)
        if (this.piloto1 == this.piloto2) {

          this.encontro = true;

      //  console.log("posicion.Pos", posicion.Pos)
          this.posicion2 = posicion.Pos;
          this.pil2 = pil;
          this.calcularPuntos();

        }
      }
      if (!this.encontro) {

        alert(posicion.Piloto + ' no existe como nombre de Piloto');
      }
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    console.log ("Reminé de ejecutar todo!!!!!")
  }
// acá graba carreraPiloto / lee pilCatPunt para comprobar si ese piloto ya tiene puntos en esa categoría
// también lee la tabla de puntos ppCarreras, calcula todos los puntos, pasa puntos actuales a puntos anteriores y hace el post

  calcularPuntos() {
    console.log("Estoy en calcularPuntos")
    this.carPil.pilotos = this.pil2;
    JSON.stringify(this.carPil.pilotos)
    console.log ("pil2:", this.pil2)
    this.carPil.carreras = this.datoCarrera;
    JSON.stringify(this.carPil.carreras)
    console.log("datoCarrera: ", this.datoCarrera)
    this.carPil.puestoCarreraPiloto = this.posicion2;

    console.log("Posicion.Pos:", this.carPil.puestoCarreraPiloto)
    this.carPilServicio.crearCarreraPiloto(this.carPil).subscribe((dato: {id:number; puestoCarreraPiloto:number;pilotos:Pilotos; carreras:Carreras }) =>{return  this.carPil});

    var pil= (this.pil2.nombrePiloto);
    var pil4=pil.trim();
    var cat=this.carPil.carreras.categorias.idCategoria;

    var idCat =this.carPil.carreras.categorias.nombreCategoria;

    this.pcp.idCategoriaPilCatPunt = cat;
    this.pcp.nombrePilotoPilCatPunt = pil4;

    this.traerPilCatPunt(pil4, cat);


    console.log("CARPIL: ", this.carPil )

  }


}


