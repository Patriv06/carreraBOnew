
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { AutodromosComponent } from './autodromos/autodromos.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { MenuComponent } from './menu/menu.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PilotosComponent } from './pilotos/pilotos.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { EditarAutComponent } from './autodromos/editar-aut/editar-aut.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarCategComponent } from './categorias/editar-categ/editar-categ.component';
import { EditaPilotoComponent } from './pilotos/edita-piloto/edita-piloto.component';
import { EditaNotComponent } from './noticias/edita-not/edita-not.component';
import { EditaSponComponent } from './sponsors/edita-spon/edita-spon.component';
import { PuntosPorCarreraComponent } from './puntosPorCarrera/puntos-por-carrera.component';
import { EditarPPCarrerasComponent } from './puntosPorCarrera/editar-ppcarreras/editar-ppcarreras.component';
import { CarreraPilotoComponent } from './carrera-piloto/carrera-piloto.component';
import { CargaExcelComponent } from './carrera-piloto/carga-excel/carga-excel.component';
import { EditarCarrerapilotoComponent } from './carrera-piloto/editar-carrerapiloto/editar-carrerapiloto.component';




const routes: Routes = [
  {path:'menu', component:MenuComponent},
  {path:'categorias', component:CategoriasComponent},
  {path:'sponsors', component:SponsorsComponent},
  {path:'autodromos', component:AutodromosComponent},
  {path:'editarAut', component:EditarAutComponent},
  {path:'noticias', component:NoticiasComponent},
  {path:'pilotos', component:PilotosComponent},
  {path:'carreras', component:CarrerasComponent},
  {path:'PPCarreras', component:PuntosPorCarreraComponent},
  {path:'CargaExcel', component:CargaExcelComponent},
  {path:'CarreraPiloto', component:CarreraPilotoComponent},
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'Home', pathMatch:'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriasComponent,
    SponsorsComponent,
    AutodromosComponent,
    MenuComponent,
    NoticiasComponent,
    PilotosComponent,
    CarrerasComponent,
    EditarAutComponent,
    EditarCategComponent,
    EditaPilotoComponent,
    EditaNotComponent,
    EditaSponComponent,
    PuntosPorCarreraComponent,
    EditarPPCarrerasComponent,
    CarreraPilotoComponent,
    CargaExcelComponent,
    EditarCarrerapilotoComponent,
  ],
  entryComponents:[
    EditarAutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
         BrowserAnimationsModule,
         MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
