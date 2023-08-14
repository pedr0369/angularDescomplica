import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lista-simples',
  templateUrl: './lista-simples.component.html',
  styleUrls: ['./lista-simples.component.css']
})
export class ListaSimplesComponent {

  constructor(private router: Router, public service: UserService){}
  users: User[] = [];

  getUsers() : void {
    this.service.getUSers().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.users = response;
        },
        error: (erro: any) => {
          console.log('Ocorreu um erro');
          console.log(erro);
        }
      }
    )
  }

  ngOnInit() : void {
    this.getUsers();
  }

  goToDetail(user: User){
    this.router.navigate(['detalhe', user.id, user.phone]);
  }

}
