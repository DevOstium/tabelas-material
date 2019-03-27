import { NgModule } from '@angular/core';
import { JanelaModalProduto } from './janela/janela-modal-produto';
import { ModalProdutos } from './modal-produtos';
import { MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/mateiral.module';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations     : [JanelaModalProduto,ModalProdutos],
    entryComponents  : [JanelaModalProduto,ModalProdutos],
    exports          : [JanelaModalProduto,ModalProdutos],
    imports : [
        CommonModule,
        MaterialModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ]
})
export class ModalModule{}