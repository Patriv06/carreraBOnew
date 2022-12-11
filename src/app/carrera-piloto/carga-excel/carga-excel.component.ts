
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
import { firstValueFrom } from 'rxjs';



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
  varPil?:void;
  varQa?:void;

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
//**************************************************BUSCA PPCARR */

//Acá en buscaPPCarr, genera uno de las claves para buscar en la tabla que tiene los puntos de acuerdo a la cantidad de autos por carrera y la posición en la que salió.
  buscaPPCarr(){

    console.log("Estoy en buscaPPCarr");

    var aut= this.datoCarrera.cantPilCarrera;

    this.pondera = this.datoCarrera.categorias.ponderadorCategoria;

    this.multiplicador = this.datoCarrera.multiplCarrera;

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

  }
 // ***************************************** FILEUPLOAD******************************************
// Sube el excel y lo lee
  fileUpload(Event: any) {

    console.log("Estoy en fileUpload")
    this.ver = false
    let selectedFile = Event.target.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onloadend = (Event) => {

  //    let binaryData = Event.target?.result;
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
//**********************************************************TRAER PILOTOS*************************************************** */
   traerPilotos() {

   console.log("Estoy en traerPilotos")

    this.pilotServicio.obtenerPilotos().subscribe((dato: Pilotos[]) => {
      this.pilot = dato;
    });
  }


//**********************************RECORRE PILOTOS******************************* */

//recorre pilotos compara los nombres con los del excel, si lo encuentra trae los puntos de tablaPuntos, va a calcular los puntos, busca pilcatpunt y graba pilcatpunt
   async recorrerPilotos() {

    console.log("Estoy en recorrerPilotos")
    for (let posicion of this.resultadosCarrera2) {

      this.encontro = false;

      for (let pil of this.pilot) {

        this.piloto1=posicion.Piloto.trim();
        this.piloto2=pil.nombrePiloto.trim();

        if (this.piloto1 == this.piloto2) {
          console.log("son iguales:", this.piloto1)

          this.encontro = true;


          this.posicion2 = posicion.Pos;
          this.pil2 = pil;
          await this.calcularPuntos();

        }
      }
      if (!this.encontro) {

        alert(posicion.Piloto + ' no existe como nombre de Piloto');
      }
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    console.log ("Terminé de ejecutar todo!!!!!")
  }

//**************************************CALCULAR PUNTOS**************************************** */

// acá graba carreraPiloto / lee pilCatPunt para comprobar si ese piloto ya tiene puntos en esa categoría
// también lee la tabla de puntos ppCarreras, calcula todos los puntos, pasa puntos actuales a puntos anteriores y hace el post

  async calcularPuntos() {

     console.log("Estoy en calcularPuntos", this.pil2 )

    this.carPil.pilotos = this.pil2;
    JSON.stringify(this.carPil.pilotos)

    this.carPil.carreras = this.datoCarrera;
    JSON.stringify(this.carPil.carreras)

    this.carPil.puestoCarreraPiloto = this.posicion2;

    await this.grabaCarreraPiloto(this.carPil);

    //this.carPilServicio.crearCarreraPiloto(this.carPil).subscribe((dato: {id:number; puestoCarreraPiloto:number;pilotos:Pilotos; carreras:Carreras }) =>{return  this.carPil});

    var pil= (this.pil2.nombrePiloto);
    var pil4=pil.trim();
    var cat=this.carPil.carreras.categorias.idCategoria;




    await this.traerPilCatPunt(pil4, cat)


    await this.traerPPCarr(this.qautos, this.posicion2)

    await this.grabaPilCatPunt(this.pcp)

    await this.grabaPiloto(this.pil2)








  }

 // *****************************************TRAER PILCATPUNT***************************************************

  // Acá lee PilCatPunt para ver si ya existe

  async traerPilCatPunt( pil:String, cat:String) {


    this.poneEnCeroPilCantPunt(pil,cat)

    var dato:PilCatPunt[] = await firstValueFrom(this.pilCPServicio.obtenerpilCatPuntPorPilyCat(pil,cat));
    console.log("muestro dato:",dato[0])
    if (dato[0] !=undefined){
    this.pilCatPunt = dato;}
    console.log("PilCatPunt de traerPilCatPunt:", this.pilCatPunt[0]);
    this.pcp = this.pilCatPunt[0];
  // this.pilCPServicio.obtenerpilCatPuntPorPilyCat(pil, cat).subscribe((dato: PilCatPunt[]) => {
    // this.pilCatPunt = dato;
   //  console.log("PilCatPunt de traerPilCatPunt:", this.pilCatPunt[0]);
    // this.pcp = this.pilCatPunt[0];



 //  });

  }

  /////// Pone en cero PilCantPunt de ese Piloto y Categoría*************

  poneEnCeroPilCantPunt(pil: String, cat: String){
    console.log("estoy en pone en cero pcp")
    this.pcp.idCategoriaPilCatPunt = cat;
    this.pcp.nombrePilotoPilCatPunt = pil;
    this.pcp.idPilCatPunt = 1;
    this.pcp.puntosActPilCantPunt = 0;
    this.pcp.puntosAntPilCantPunt = 0;


    console.log ("Estoy en traerPilCatPunt. Pil: ", pil, "cat: " ,cat, this.pcp)
  }
// ************************************TRAER PPCARR************************************

// acá Calcula los puntos
async traerPPCarr(qa:number, pos:number){

  console.log("estoy en traerPPCarr: ", qa, pos)

  var dato = await firstValueFrom(this.ppCarrServicio.obtenerPPCarrerasPorQAutos(qa,pos));
  this.ppCarr = dato;
  this.puntoXCarrera= this.ppCarr[0].puntosPPCarreras;
  this.puntoXCarrera = this.puntoXCarrera * this.pondera * this.multiplicador;
  this.pcp.idPilCatPunt = this.pilCatPunt[0].idPilCatPunt;
  this.pcp.puntosAntPilCantPunt = this.pilCatPunt[0].puntosActPilCantPunt;
  this.pcp.puntosActPilCantPunt = this.pilCatPunt[0].puntosActPilCantPunt + this.puntoXCarrera;
  console.log("puntos por puesto:", this.ppCarr[0], "  ",this.puntoXCarrera);
  console.log("PCP  :", this.pcp);

// acá armé todo y voy a grabar

 // })

}

//****************************************GRABA PILCATPUNT***************************************** */

// acá  graba  PilCatPunt
async grabaPilCatPunt(pcp:PilCatPunt){

  console.log("Estoy en grabaPilCatPunt", pcp)
  const dato = await firstValueFrom(this.pilCPServicio.crearPilCatPunt(this.pcp))
    //.subscribe((dato: { idPilCatPunt: number; nombrePilotoPilCatPunt: String; idCategoriaPilCatPunt: String; puntosAntPilCantPunt: number; puntosActPilCantPunt: number; }) => console.log("creó PilCatPunt", this.pcp, dato));

  }

  //**************************************************GRABA PILOTO ****************** */
  // Calcula los puntos totales del piloto sumando todas las categorias donde tiene puntos
  async grabaPiloto(pil:Pilotos){
    console.log("Estoy en grabaPiloto", pil)
    pil.puntajeAntPiloto = pil.puntajeActPiloto;
    pil.puntajeActPiloto = pil.puntajeActPiloto + this.puntoXCarrera;
    const dato = await firstValueFrom(this.pilotServicio.crearPilotos(pil))
  }

  //**************************************************GRABA PILOTO ****************** */
  // Calcula los puntos totales del piloto sumando todas las categorias donde tiene puntos
  async grabaCarreraPiloto(carp:CarreraPiloto){
    console.log("Estoy en grabaCarreraPiloto", carp)

    const dato = await firstValueFrom(this.carPilServicio.crearCarreraPiloto(carp))
  }
}





