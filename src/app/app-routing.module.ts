import { AdministradorComponent } from './vistas/administrador/administrador.component';
import { NuevolicorComponent } from './vistas/nuevolicor/nuevolicor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './vistas/login/login.component';
import{StockComponent} from './vistas/stock/stock.component';



const routes: Routes = [
{path:'',redirectTo:'login', pathMatch:'full'},
{path:'login', component:LoginComponent},
{path:'nuevolicor', component:NuevolicorComponent},
{path:'stock', component:StockComponent},
{path:'administrador', component:AdministradorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const  rutascomponente=[LoginComponent,NuevolicorComponent,StockComponent,AdministradorComponent]
