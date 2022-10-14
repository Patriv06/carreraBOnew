
import { EditarAutComponent } from './autodromos/editar-aut/editar-aut.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutodromosComponent } from './autodromos/autodromos.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PilotosComponent } from './pilotos/pilotos.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { PuntosPorCarreraComponent } from './puntosPorCarrera/puntos-por-carrera.component';

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
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
