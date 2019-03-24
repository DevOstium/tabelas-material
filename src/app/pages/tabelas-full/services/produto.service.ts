import { Injectable } from '@angular/core';
import { Produto } from '../../tabela-checkbox/domain/tabela-checkbox.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamPaginacao } from '../domain/param-paginacao';


const URL_API = 'http://localhost:8080';

@Injectable()
export class ProdutoService {

    constructor(private http : HttpClient){}

    findAll() : Observable<Produto[]> {
        return this.http.get<Produto[]>('http://localhost:8080/produtos/paginacao/?categorias=1,2,3');
                        //.pipe( map( response => response['content']) );
    }

    getProdutosPaginados( params? : ParamPaginacao )  : Observable<Produto[]> {
        return this.http.get<Produto[]>(  `${URL_API}/produtos/paginacao/?pagina=${params.pageIndex}&linhasPorPagina=${params.pageSize}` )
    }
   
    getSortProdutosPaginados( orderBy, direction , pagina )  : Observable<Produto[]> {
        return this.http.get<Produto[]>(  `${URL_API}/produtos/paginacao/?orderBy=${orderBy}&direction=${direction}&pagina=${pagina}` )
    }

}