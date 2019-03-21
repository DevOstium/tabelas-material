import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap,  finalize, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../domain/categoria.model';

@Component({
     selector   : 'input-pesquisa-categoria',
    templateUrl : 'tabela-full-pesquisa.component.html',
    styleUrls   : ['tabel-full-pesquisa.component.css'] 
})
export class TabelaFullPesquisaComponent implements OnInit{

    categorias    : Categoria[] = [];
    categoriaForm : FormGroup;
    isLoading     = false;

    table$ : Observable<Categoria[]>;    

    pesquisa : Subject<string> = new Subject<string>();

    constructor(
                private formBuilder       : FormBuilder,
                private categoriaService  : CategoriaService
                ){}

    ngOnInit(): void {

        this.pesquisa
            .pipe(
                    debounceTime(400),
                    tap( () => this.isLoading = true ),
                    tap( search => (search) ? search : this.loadTable( )),
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
                        



        this.categoriaForm = this.formBuilder.group({ userInput: null  });  
  
    }

    displayFn( categoria : Categoria ){
        if(categoria) {
            return categoria.nome;
        }
    }                          

    loadTable( usuario = '' ){
        console.log("loadTable : " , usuario)
       //this.table$  =  this.service.resultTable(usuario);
    }


}