import {Component, Inject, OnInit, HostListener} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { DadosModalModel } from '../domain/dados-modal.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl : 'janela-modal-produto.html',
    styleUrls   : ['janela-modal.css']
})
export class JanelaModalProduto implements OnInit {

  produtoForm : FormGroup;

  constructor(
                                         private formBuilder  : FormBuilder, 
                                         private router       : Router,
                                         public dialogRef     : MatDialogRef<JanelaModalProduto>,
                @Inject(MAT_DIALOG_DATA) public data          : DadosModalModel
    ) {
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    
      this.produtoForm = this.formBuilder.group(
                                                  {
                                                    nome          : [''],
                                                    estoque       : [''],
                                                    prazoValidade : [''],
                                                    sku           : [''], 
                                                    precoVenda    : [''] 
                                                  }
                                                ) 
  }  

  onNoClick(): void {
    this.dialogRef.close();
  }



}