import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaCheckboxComponent } from './pages/tabela-checkbox/tabela/tabela-checkbox.component';

const routes: Routes = [

  {path:'',   pathMatch: 'full' , redirectTo: 'tabela-checkbox'},
  {path: 'tabela-checkbox' , component : TabelaCheckboxComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
