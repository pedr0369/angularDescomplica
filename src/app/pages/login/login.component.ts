import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutorizacaoService } from 'src/app/service/autorizacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  private fb = inject(FormBuilder);

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ]
  });

  hasUnitNumber = false;

  constructor(private autorizacaoService: AutorizacaoService){}

  loginClick() {
    if(this.autorizacaoService.obterLoginStatus())
      this.autorizacaoService.deslogar();
    else
      this.autorizacaoService.autorizar();
  }

  onSubmit(): void {
    this.loginClick();
    alert('Thanks!');
  }
}
