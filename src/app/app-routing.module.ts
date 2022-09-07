import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutodromosComponent } from './autodromos/autodromos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SponsorsComponent } from './sponsors/sponsors.component';



const routes: Routes = [
   {path:'categorias', component:CategoriasComponent},
  {path:'sponsors', component:SponsorsComponent},
  {path:'autodromos', component:AutodromosComponent},
  {path:'home', component:HomeComponent},
  {path: '**', component:PageNotFoundComponent},
  //{path:'', redirectTo:'Home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
