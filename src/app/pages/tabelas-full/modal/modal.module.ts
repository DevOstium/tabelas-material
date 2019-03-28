import { NgModule } from '@angular/core';
import { JanelaModalProduto } from './janela/janela-modal-produto';
import { ModalProdutos } from './modal-produtos';
import { MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/mateiral.module';
import { CommonModule } from '@angular/common';
import { DebounceClickDirective } from '../directivas/debounce-click.directive';


@NgModule({
    declarations     : [JanelaModalProduto,ModalProdutos, DebounceClickDirective],
    exports          : [JanelaModalProduto,ModalProdutos, DebounceClickDirective],
    entryComponents  : [JanelaModalProduto,ModalProdutos],
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