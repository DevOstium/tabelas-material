import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';

import { TabelaFullPesquisaComponent } from './tabela-full-pesquisa.component';
import { CategoriaService } from '../services/categoria.service';

@NgModule({
    declarations : [TabelaFullPesquisaComponent],
    exports:[TabelaFullPesquisaComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,

    ],
    providers: [CategoriaService]
})
export class TabelaFullPesquisaModule {}