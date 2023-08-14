import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutorizacaoService } from '../service/autorizacao.service';


export const autorizadoGuard:  CanActivateFn = (route, state) => {
  const router        = inject(Router);
  const usuarioLogado = localStorage.getItem("login");

  if(usuarioLogado != null && usuarioLogado == 'sim'){
    return true;
  }
  else{
    router.navigate(['home']);
    return false;
  }
  
}