import { PilCatPuntService } from './../pil-cat-punt.service';
import { CarreraPilotoService } from './../carrera-piloto.service';
import { CarreraPiloto } from './../carrera-piloto';
import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Pilotos } from 'src/app/pilotos/pilotos';
import { PilotosService } from 'src/app/pilotos/pilotos.service';
import { Carreras } from 'src/app/carreras/carreras';
import { CarrerasService } from 'src/app/carreras/carreras.service';
import { outputAst } from '@angular/compiler';
import { PilCatPunt } from '../pil-cat-punt';


@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.scss'],
})
export class CargaExcelComponent implements OnInit {


  @Input() datoCarrera: any ;
  carr:Carreras[]=[];
  ngOnInit(): void {
    this.traerPilotos();


  }

  constructor(
    private pilotServicio: PilotosService,
    private carServicio: CarrerasService,
    private carPilServicio: CarreraPilotoService,
    private pilCPServicio: PilCatPuntService
  ) {}
  ver:boolean=true;
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
  pilCatPunt!: PilCatPunt/* [] = [
   {
    idPilCatPunt:1,
    nombrePilotoPilCatPunt:" ",
    idCategoriaPilCatPunt:" ",
    puntosAntPilCantPunt:1,
    puntosActPilCantPunt:1
  }];  */

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

  encontro: boolean = false;



  fileUpload(Event: any) {
    let selectedFile = Event.target.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onloadend = (Event) => {
      console.log(Event);
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
    this.pilotServicio.obtenerPilotos().subscribe((dato: Pilotos[]) => {
      this.pilot = dato;
    });
  }

  traerPilCatPunt( pil:String, cat:String) {

    this.pilCPServicio.obtenerpilCatPuntPorPilyCat(pil, cat).subscribe((dato : PilCatPunt) => {this.pilCatPunt= dato;
      console.log("Leyó pilCatPunt: ", this.pilCatPunt);
    });
  }

   recorrerPilotos() {
    for (let posicion of this.resultadosCarrera2) {
      this.encontro = false;

      for (let pil of this.pilot) {

        if (posicion.Piloto == pil.nombrePiloto) {
          console.log('entro en el if');
          this.encontro = true;
          console.log('encontro 2: ', this.encontro, " Posición Piloto ", posicion.Pos );
          this.posicion2 = posicion;
          this.pil2 = pil;
          this.calcularPuntos();
        }
      }
      if (!this.encontro) {
        alert(posicion.Piloto + ' no existe como nombre de Piloto');
      }
    }
  }

  calcularPuntos() {

    this.carPil.pilotos = this.pil2;
    JSON.stringify(this.carPil.pilotos)
    this.carPil.carreras = this.datoCarrera;
    JSON.stringify(this.carPil.carreras)
    this.carPil.puestoCarreraPiloto = this.posicion2.Pos;
    console.log('Estoy en calcular Puntos', this.pil2.nombrePiloto);
    console.log("Estoy en calcular puntos y muestro carreras", this.datoCarrera)
    console.log("CarPil :", this.carPil);
    this.carPilServicio.crearCarreraPiloto(this.carPil).subscribe((dato: {id:number; puestoCarreraPiloto:number;pilotos:Pilotos; carreras:Carreras }) =>console.log("Listo:", this.carPil));
    var pil= (this.pil2.nombrePiloto);
    var pil4=pil.trim();
    var cat=this.carPil.carreras.categorias.nombreCategoria;
    console.log ("pil:", pil4," cat:", cat )
    this.traerPilCatPunt(pil4, cat);
  }
}
