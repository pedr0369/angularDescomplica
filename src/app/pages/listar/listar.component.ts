import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListarDataSource, ListarItem } from './listar-datasource';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: false }) table!: MatTable<User>;
  dataSource = new MatTableDataSource <User> ([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  constructor(public service: UserService){}
  users: User[] = [];
  displayedColumns = ['id', 'firstName', 'email', 'phone', 'cpf'];

  ngOnInit() {
    this.getUsers()
  }

  getUsers() : void {
    this.service.getUSers().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.dataSource = new MatTableDataSource<User> (response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log('RESPONSE', response);
        },
        error: (erro: any) => {
          console.log('Ocorreu um erro');
          console.log(erro);
        }
      }
    )
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
