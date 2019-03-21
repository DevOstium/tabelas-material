import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabelaCheckboxModule } from './pages/tabela-checkbox/tabela-checkbox.module';
import { TabelaFullModule } from './pages/tabelas-full/tabale-full.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabelaCheckboxModule,
    TabelaFullModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
