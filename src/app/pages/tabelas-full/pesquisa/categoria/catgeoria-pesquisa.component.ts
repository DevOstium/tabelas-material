import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, tap,  finalize, switchMap, startWith, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../domain/categoria.model';

@Component({
    selector : 'categoria-pesquisa',
    templateUrl : './catgeoria-pesquisa.component.html',
    styleUrls : ['catgeoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit{
    

    visible            = true;
    selectable         = true;
    removable          = true;
    addOnBlur          = true;
    separatorKeysCodes : number[]    = [ENTER, COMMA];
    fruitCtrl          = new FormControl();
    allFruits          : Categoria[] = [];
    
    categorias         : Categoria[] = [];
    categoriaForm      : FormGroup;
    
    
    filteredFruits     : Categoria[] = [];
    fullList           : Categoria[] = [];
    pesquisaCategoria  : Subject<string> = new Subject<string>();
    fruits             : Categoria[] = [];

    @Output() 
    paramsPesquisaCategoria = new EventEmitter<Categoria[]>();


    @ViewChild('fruitInput') 
    fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto')
    matAutocomplete: MatAutocomplete;

    constructor( private  categoriaService  : CategoriaService){}
    
    ngOnInit(): void {
              this.categoriaService.findAll().subscribe( res => {
                                                                    this.filteredFruits = res;
                                                                    res.forEach( c =>  this.fullList.push(c)); 
                                                                } 
                                                          );
    }

    remove(fruit: Categoria): void {
      const index          = this.fruits.indexOf(fruit);
    
      if (index >= 0) {
        this.fruits.splice(index, 1);
        this.filteredFruits = this.filteredFruits.concat(  this.fullList.filter(  item => item.nome.includes(fruit.nome) )    )
        this.paramsPesquisaCategoria.emit(this.fruits);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
          const index          = this.fruits.indexOf(event.option.value);
          const indexFiltrados = this.filteredFruits.indexOf(event.option.value);

          if (index <= -1 && indexFiltrados == 0 ) {
                this.fruits.push(event.option.value);
                this.filteredFruits.splice( indexFiltrados, 1);
                this.paramsPesquisaCategoria.emit(this.fruits);
          }

          this.fruitInput.nativeElement.value = '';
          this.fruitCtrl.setValue(null);
    }

}