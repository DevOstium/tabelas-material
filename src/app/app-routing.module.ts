import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaCheckboxComponent } from './pages/tabela-checkbox/tabela/tabela-checkbox.component';
import { TabelaFullComponent } from './pages/tabelas-full/tabela/tabela-full.component';

const routes: Routes = [

  {path:'',   pathMatch: 'full' , redirectTo: 'tabela-full'},
  {path: 'tabela-checkbox' , component : TabelaCheckboxComponent},
  {path: 'tabela-full' , component : TabelaFullComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
