import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/mateiral.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, MatPaginatorIntl } from '@angular/material';
import { TabelaFullComponent } from './tabela/tabela-full.component';
import { TabelaFullPesquisaModule } from './pesquisa/tabela-full-pesquisa.module';
import { ProdutoService } from './services/produto.service';
import { getDutchPaginatorIntl } from './services/translater-paginator.service';

@NgModule({
    declarations: [TabelaFullComponent],
    exports: [TabelaFullComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        TabelaFullPesquisaModule
    ],
    providers : [
        ProdutoService,
        { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
    ]
})
export class TabelaFullModule {}