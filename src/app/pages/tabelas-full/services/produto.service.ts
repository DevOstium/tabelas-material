import { Injectable } from '@angular/core';
import { Produto } from '../../tabela-checkbox/domain/tabela-checkbox.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProdutoService {

    constructor(private http : HttpClient){}

    findAll() : Observable<Produto[]> {
        return this.http.get<Produto[]>('http://localhost:8080/produtos/paginacao/?categorias=3')
                        .pipe( map( response => response['content']) );
    }
}