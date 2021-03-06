import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, tap,  finalize, switchMap, startWith, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../domain/categoria.model';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../../tabela-checkbox/domain/tabela-checkbox.model';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
     selector   : 'input-pesquisa-categoria',
    templateUrl : 'tabela-full-pesquisa.component.html',
    styleUrls   : ['tabel-full-pesquisa.component.css'] 
})
export class TabelaFullPesquisaComponent implements OnInit, OnDestroy {

    categorias    : Categoria[] = [];
    categoriaForm : FormGroup;
    isLoading     = false;
    minDate       = new Date(2019, 3, 20);
    maxDate       = new Date(2019, 3, 24);

    produtos : Produto[] = [];    
    pesquisa : Subject<string> = new Subject<string>();
    paramsCategoria : Categoria[] = [];

    @Output() 
    paramsPesquisaProduto = new EventEmitter<string[]>();
    
    constructor(
                private  formBuilder       : FormBuilder,
                private  categoriaService  : CategoriaService,
                private  produtoService    : ProdutoService
                ){}

    ngOnInit(): void {
        this.categoriaForm = this.formBuilder.group(
                                                      { 
                                                        produto       : [''],
                                                        categoria     : [''],
                                                        dataInicial   : [''],
                                                        dataFinal     : [''],   
                                                        inativo       : [''],
                                                     }
                                                ); 

        this.pesquisa
                    .pipe(
                            debounceTime(400),
                            tap( () => this.isLoading = true ),
                            switchMap( search =>  {
                                                console.log("search send to server: " , search)       
                                                return   this.categoriaService.findAll(search)
                                                                                .pipe(finalize(() => this.isLoading = false ) );                                
                                                } 
                                    )
                        ).subscribe(  response => {
                                                        console.log("response : " , response)
                                                        this.categorias = response;
                                                    }                
                                ); 
    }

    displayFn( categoria : Categoria ){
        if(categoria) {
            return categoria.nome;
        }
    }                          

    ngOnDestroy(): void {
        console.log("Chamou o unsubscribe() : " )
        this.pesquisa.unsubscribe();
    }

    sendParamTableProdutos(){
        this.categoriaForm.get('categoria').setValue(this.paramsCategoria);
        this.paramsPesquisaProduto.emit(this.categoriaForm.getRawValue());
    }

    delete(id){
    }

    loadProdutosInput(){
        console.log("Load P")
        this.categoriaService.findAll().subscribe(  response => {
                                                            console.log("loadProdutosInput : " , response)
                                                            this.categorias = response;
                                                        }                
                                                ); 
    }

}  // end Class