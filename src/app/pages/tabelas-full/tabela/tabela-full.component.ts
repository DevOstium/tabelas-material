import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator, MatSort, MatPaginatorIntl} from '@angular/material';

import { Produto } from '../domain/produto.model';
import { ProdutoService } from '../services/produto.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ParamPaginacao } from '../domain/param-paginacao';
import { tap, delay, debounceTime } from 'rxjs/operators';


@Component({
    selector     : 'tabela-full',
    templateUrl  : './tabela-full.component.html',
    styleUrls    : ['tabela-full.component.css']

})
export class TabelaFullComponent implements OnInit , AfterViewInit {
    
  produto           : Produto[] = [];
  displayedColumns  : string[] = ['select', 'id', 'nome', 'estoque', 'prazoValidade', 'precoVenda', 'inativo' ];
  dataSource        : any;
  selection         = new SelectionModel<Produto>(true, []);
  
  backgroundTR = false;
  

  isLoadingResults = false;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  
  @ViewChild(MatSort) 
  sort: MatSort;

  tableProdutoFrom : FormGroup;

  defaulParamPaginator : ParamPaginacao;

  linhaPorPagina = [2,3,5,8, 20] 

  constructor(private produtoService : ProdutoService, private formBuild : FormBuilder){}
  
  ngOnInit(): void {
      this.paginator.pageSizeOptions = this.linhaPorPagina;
      this.isLoadingResults = true; 
      this.produtoService.findAll().subscribe( response => {
                                                          //console.log("response['content']", response)
                                                          this.produto =  response['content']
                                                          //console.log(" this.produto : " , this.produto)
                                                          this.dataSource             = new MatTableDataSource<Produto>(this.produto);
                                                          this.paginator.length       = response['totalElements'];
                                                          this.paginator.pageSize     = 4;
                                                          this.dataSource.paginator   = this.paginator;
                                                          this.isLoadingResults       = false;
                                                         
                                                        }
                                         )
  }

  ngAfterViewInit() {
   
    this.sort.sortChange.subscribe(
      
          () => {  
            this.isLoadingResults = true
            console.log("click")
            console.log("order by ", this.sort.active, " direction " , this.sort.direction, " pagina ", this.paginator.pageIndex)

              const orderBy =  this.sort.active;
              const direction = this.sort.direction;
              const pagina = 0; 

              this.produtoService.getSortProdutosPaginados(orderBy, direction.toUpperCase() , pagina)
                                 .subscribe( response => {

                                                            this.produto = [];
                                                            //console.log("response['content']", response)
                                                            this.produto =  response['content']
                                                            //console.log(" this.produto : " , this.produto)
                                                            this.dataSource             = new MatTableDataSource<Produto>(this.produto);
                                                            //this.dataSource.paginator   = this.paginator;
                                                            //console.log("response['totalElements'] : " , response['totalElements'])
                                                            this.paginator.length = response['totalElements'];
                                                            //console.log("this.paginator.getNumberOfPages" , this.paginator.getNumberOfPages())
                                                            this.isLoadingResults = false;
                                                        }                
                                          );


          }
      );
      
      
      console.log("sequencia")


  }


  getServerData(params? : ParamPaginacao){
    console.log(" getPaginatorData(event){ " , params)


    /*
     length: 20             -- totalRegistros
     pageIndex: 0           -- paginaAtual
     pageSize: 3            -- linhasPorPagina       
     previousPageIndex: 1   -- proximaPagina 
   */
          this.produtoService.getProdutosPaginados(params).subscribe( response => {

                                                                  this.produto = [];
                                                                  //console.log("response['content']", response)
                                                                  this.produto =  response['content']
                                                                  //console.log(" this.produto : " , this.produto)
                                                                  this.dataSource             = new MatTableDataSource<Produto>(this.produto);
                                                                  //this.dataSource.paginator   = this.paginator;
                                                                  //console.log("response['totalElements'] : " , response['totalElements'])
                                                                  this.paginator.length = response['totalElements'];
                                                                  //console.log("this.paginator.getNumberOfPages" , this.paginator.getNumberOfPages())
                                                                  //this.dataSource.sort        = this.sort;
          
                                                                              }
                                                                  )           

  }



   tr(e){
     console.log("e ------" , e)
     this.backgroundTR = !this.backgroundTR;
   }

   getTotalCost() {
      return this.produto.map(t => t.estoque).reduce((acc, value) => acc + value, 0);
  }

  checkboxLabel(row?: Produto): string {
    
    if (!row) {
      this.isAllSelected() ? this.backgroundTR = true : this.backgroundTR = false;
      return `${this.isAllSelected() ? 'select'  : 'deselect'} all`;
    }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isAllSelected() {
        const numSelected  = this.selection.selected.length;
        const numRows      = this.produto.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
                          this.selection.clear() :
                          this.dataSource.data.forEach(row => this.selection.select(row));
    
    this.back();
  }
  back(){
    console.log("back")
    //this.isAllSelected() ?  console.log("select ") : console.log("nadada")
    this.dataSource.data.forEach( row => this.selection.isSelected(row) ? this.backgroundTR = true : this.backgroundTR = false );
  }

  loadTabelaProdutos(params){
      //console.log(" params recebido com sucesso : ", params)
  }


  salvar() {
    //console.log("Salvar")

     const idsToSalve : any[] = []; 
     this.dataSource.data.forEach( row => this.selection.isSelected(row) ? idsToSalve.push(row) : '' );
     //console.log("idsToSalve : " , idsToSalve)

  }





}