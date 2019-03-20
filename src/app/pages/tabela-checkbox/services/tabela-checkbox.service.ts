import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:8080/produtos/paginacao';

@Injectable()
export class TabelaCheckboxService{

    constructor(private http : HttpClient){ }

    findProduto(){
        return this.http.get(`${API}/?categorias=1`);
    }


}