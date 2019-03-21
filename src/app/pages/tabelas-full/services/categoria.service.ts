import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../domain/categoria.model';
import { Observable } from 'rxjs';


@Injectable()
export class CategoriaService {

    constructor(private http : HttpClient){}

    findAll( param :  string =  '') : Observable<Categoria[]>{
        return this.http.get<Categoria[]>('http://localhost:8080/categorias');
    }

}