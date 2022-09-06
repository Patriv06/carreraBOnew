import { Component, OnInit } from '@angular/core';
import { Sponsors } from './sponsors';
import { SponsorsService } from './sponsors.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})

export class SponsorsComponent {
// export class SponsorsComponent implements OnInit {

  /* pages: number = 1;
  spo!: Sponsors[];
  spon = {
    id:1,
    logoSponsor:"",
    linkSponsor:" ",
    espacioSponsor:" ",
    }

  constructor(private sponsorsServicio:SponsorsService) { }

  ngOnInit(): void {
     this.traerSponsors();

  }

  private traerSponsors(){
   this.sponsorsServicio.obtenerSponsors().subscribe(dato =>{this.spo = dato})

    console.log(this.spo);
    }
    public modifSponsors(spo:Sponsors){

        this.sponsorsServicio.modificarSponsors(spo).subscribe(()=>this.traerSponsors());
      }

      public delSponsors(sponsors:Sponsors):void{
       this.sponsorsServicio.borrarSponsors(sponsors).subscribe(()=>this.traerSponsors());


     }
     public altaSponsor(sponso:Sponsors){

      this.sponsorsServicio.crearSponsors(sponso).subscribe((dato: { id: number; logoSponsor:Blob; linkSponsor:string; espacioSponsor: string}) =>{sponso = dato});

     }
    recargar(): void {
      window.location.reload();
    }

     */
    constructor(private httpClient: HttpClient) { }

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  //Gets called when the user selects an image
  public  onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
