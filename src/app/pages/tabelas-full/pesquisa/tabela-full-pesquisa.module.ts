import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/mateiral.module';

import { TabelaFullPesquisaComponent } from './tabela-full-pesquisa.component';
import { CategoriaService } from '../services/categoria.service';
import { ProdutoService } from '../services/produto.service';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations : [TabelaFullPesquisaComponent],
    exports:[TabelaFullPesquisaComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule
    ],
    providers: [CategoriaService, ProdutoService]
})
export class TabelaFullPesquisaModule {}