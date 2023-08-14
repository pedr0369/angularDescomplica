import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //BASE_URL: string = 'http://0.0.0.0:3000/';
  BASE_URL: string = 'https://pedr0369-glowing-computing-machine-gg5gq45qvvcwxg6-3000.app.github.dev/';

  constructor(private http:HttpClient) { }

  getUSers(): Observable<User[]>{
    return this.http.get<User[]>(this.BASE_URL + 'users')
  }

  addUser(user:any): Observable<User>{
    return this.http.post<User>(this.BASE_URL + 'users', user, httpOptions)
  }

  editUser(user:any): Observable<User>{
    let url:string = this.BASE_URL + 'users/' + user.id;
    return this.http.post<User>(url, user, httpOptions)
  }

  deleteUser(user:any): Observable<User>{
    let url:string = this.BASE_URL + 'users/' + user.id;
    return this.http.post<User>(url, httpOptions)
  }

}
