import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutodromosComponent } from './autodromos/autodromos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

const routes: Routes = [
  {path:'menu', component:MenuComponent},
  {path:'categorias', component:CategoriasComponent},
  {path:'sponsors', component:SponsorsComponent},
  {path:'autodromos', component:AutodromosComponent},
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
