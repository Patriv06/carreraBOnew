import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Pilotos } from 'src/app/pilotos/pilotos';
import { PilotosService } from 'src/app/pilotos/pilotos.service';
import { Carreras } from 'src/app/carreras/carreras';
import { CarrerasService } from 'src/app/carreras/carreras.service';


@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.scss'],
})
export class CargaExcelComponent implements OnInit {
  ngOnInit(): void {
    this.traerPilotos();
    this.traerCarreras();

  }

  constructor(private pilotServicio: PilotosService,private carServicio:CarrerasService ) {}
  resultadosCarrera: any;
  resultadosCarrera2: any;
  carre: Carreras[] = [];
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
  pil = {
    idPiloto: 1,
    nombrePiloto: ' ',
    apellidoPiloto: ' ',
    urlImgPiloto: ' ',
    puntajeAntPiloto: 1,
    puntajeActPiloto: 1,
  };

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

      // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]));
      this.resultadosCarrera2 = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetNames[0]]
      );

      this.recorrerPilotos();
    };
  }

  public traerPilotos() {
    this.pilotServicio.obtenerPilotos().subscribe((dato: Pilotos[]) => {
      this.pilot = dato;
    });
  }
 public traerCarreras(){
    this.carServicio.obtenerCarreras().subscribe(dato =>{this.carre = dato});
  }
  public recorrerPilotos() {
    for (let posicion of this.resultadosCarrera2) {
      this.encontro = false;
     /*  console.log('Encontro |', this.encontro);


      console.log(
        'excel:',
       posicion.Piloto.length,
        posicion.Piloto,
        'estoy iterando en excel'
      );
      console.log(this.pilot) */
      for (let pil of this.pilot) {

        /* console.log( "excel length:",
          posicion.Piloto.length )
          console.log("Piloto lenght", pil.nombrePiloto.length)
          console.log("Archivo: ", pil.nombrePiloto)

          console.log("Excel: ", posicion.Piloto)

          console.log('Estoy iterando en Pilotos'
        ); */
        if (posicion.Piloto == pil.nombrePiloto) {
          console.log(

            'entro en el if'
          );
          this.encontro = true;
          console.log('encontro 2: ', this.encontro);
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
    console.log('Estoy en calcular Puntos', this.pil2.nombrePiloto);
  }
}
