import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap,  finalize, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../domain/categoria.model';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../../tabela-checkbox/domain/tabela-checkbox.model';

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

    @Output() 
    paramsPesquisaProduto = new EventEmitter<string>();
    
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

    sendParamTableProdutos(  ){
        console.log("sendParamTableProdutos() ")

        this.paramsPesquisaProduto.emit( this.categoriaForm.getRawValue());
        
    }

    delete(id){

    }

}