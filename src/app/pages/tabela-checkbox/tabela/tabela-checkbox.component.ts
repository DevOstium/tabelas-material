import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { TabelaCheckboxService } from '../services/tabela-checkbox.service';

import { Produto } from '../domain/tabela-checkbox.model';

@Component({
    selector     : 'tabela-checkbox',
    templateUrl  : './tabela-checkbox.component.html',
    styleUrls    :  ['./tabela-checkbox.component.css']
})
export class TabelaCheckboxComponent implements OnInit {
  
  produto : Produto[] = [];

  displayedColumns : string[] = ['select', 'id', 'nome', 'estoque', 'prazoValidade', 'precoVenda'];
  dataSource : any;
  selection        = new SelectionModel<Produto>(true, []);
  
  constructor(private service : TabelaCheckboxService){}
  
  ngOnInit(): void {
      this.service.findProduto().subscribe( response => {
                                                          console.log("response['content']", response['content'])
                                                          this.produto =  response['content']
                                                          console.log(" this.produto : " , this.produto)
                                                          this.dataSource = new MatTableDataSource<Produto>(this.produto);
                                                        }
                                         )
  }
 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
        const numSelected  = this.selection.selected.length;
        const numRows      = this.produto.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
                          this.selection.clear() :
                          this.dataSource.data.forEach(row => this.selection.select(row));

  }

  salvar() {
    console.log("Salvar")

     const idsToSalve : any[] = []; 
     this.dataSource.data.forEach( row => this.selection.isSelected(row) ? idsToSalve.push(row) : '' );
     console.log("idsToSalve : " , idsToSalve)

  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Produto): string {
    
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  
    
  }


}

