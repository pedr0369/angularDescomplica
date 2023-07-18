import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, mapToCanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AutorizacaoService } from '../service/autorizacao.service';
import { UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

//export const autorizadoGuard: CanActivateFn = (route, state) => {
export class autorizadoGuard implements CanActivate {

  constructor(
    private autorizadoService: AutorizacaoService,
    private routerService: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const usuarioEstaLogado = this.autorizadoService.obterLoginStatus();
      if(usuarioEstaLogado)
        return true;
      this.routerService.navigate(["/login"]);
      return false;
    } 
  
};
