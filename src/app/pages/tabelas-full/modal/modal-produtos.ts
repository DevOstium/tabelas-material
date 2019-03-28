import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import { JanelaModalProduto } from './janela/janela-modal-produto';

@Component({
    selector    : 'modal-produto',
    templateUrl : 'modal-produtos.html'
  })
export class ModalProdutos {

    animal : string;
    name   : string;  
    disableButton = false;

    constructor(public dialog: MatDialog){ }          

    openDialog(): void {
        const dialogRef = this.dialog.open(
                                           JanelaModalProduto, {
                                                                  width  : '80%',
                                                                  height : 'auto',
                                                                  data   : {name: this.name, animal: this.animal}
                                                                  
                                                               }
                                          );
    
        dialogRef.afterClosed().subscribe(result => {
                                                      console.log('The dialog was closed');
                                                      this.animal = result;
                                                    }
                                         );
    }





}