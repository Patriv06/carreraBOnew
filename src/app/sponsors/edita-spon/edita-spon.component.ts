import { Sponsors } from './../sponsors';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorsService } from '../sponsors.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-edita-spon',
  templateUrl: './edita-spon.component.html',
  styleUrls: ['./edita-spon.component.scss']
})
export class EditaSponComponent implements OnInit {

  constructor(private sponServicio:SponsorsService, private router:Router,@Inject(MAT_DIALOG_DATA) public data:Sponsors,
  private matDialogRef:MatDialogRef<EditaSponComponent>) { }

  ngOnInit(): void {
  }


  public modifSponsors(spo:Sponsors){
    if (spo.nombreSponsor != " "){

     this.sponServicio.modificarSponsors(spo).subscribe(()=>this.mostrarOcultar())
     this.mostrarOcultar()
    }
    else{  alert("El nombre no puede estar en blanco")}
}

public cerrarMat(){
  this.matDialogRef.close()

}

public mostrarOcultar() {

  window.location.reload();

  }
}
