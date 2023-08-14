import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorizacaoService } from 'src/app/service/autorizacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  private fb = inject(FormBuilder);

  addressForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email])],
    password: ['', Validators.required]
  });

  email = this.addressForm.controls['email'];

  getErrorMessage(){
    if(this.email.hasError('required')){
      return 'O email é obrigatório';
    }

    return this.email.hasError('email') ? 'Você deve preencher um valor para o email!' : '';
  }

  constructor(private autorizacaoService: AutorizacaoService, private router : Router){}

  loginClick() {
    if(this.autorizacaoService.obterLoginStatus())
      this.autorizacaoService.deslogar();
    else
      this.autorizacaoService.autorizar();
  }

  onSubmit(): void {
    this.loginClick();
    this.router.navigate(['privado']);
  }
}
