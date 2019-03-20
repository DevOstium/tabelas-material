import { NgModule } from '@angular/core';
import { TabelaCheckboxComponent } from './tabela/tabela-checkbox.component';
import { MaterialModule } from '../material/mateiral.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material';
import { TabelaCheckboxService } from './services/tabela-checkbox.service';

@NgModule({
    declarations: [TabelaCheckboxComponent],
    exports: [TabelaCheckboxComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        ReactiveFormsModule
    ],
    providers : [TabelaCheckboxService]
})
export class TabelaCheckboxModule {}