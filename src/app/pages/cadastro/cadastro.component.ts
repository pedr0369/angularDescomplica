import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/common/validator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  private fb = inject(FormBuilder);
  private service = inject(UserService);
  user: User = new User();

  addressForm = this.fb.group({
    firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(70)])],
    email: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email])],
    cpf: [null, Validators.required],
    cep: [null, Validators.compose([Validators.required])],
    phone: [null, Validators.required],
    password: [null, Validators.required]
  });

  email = this.addressForm.controls['email'];

  getErrorMessage(){
    if(this.email.hasError('required')){
      return 'O email é obrigatório';
    }

    return this.email.hasError('email') ? 'Você deve preencher um valor para o email!' : '';
  }


  onSubmit(): void {
    //this.user.id = '1';

    if(this.addressForm.controls['firstName'].value){
      this.user.firstName = this.addressForm.controls['firstName'].value;
    }

    if(this.addressForm.controls['email'].value){
      this.user.email = this.addressForm.controls['email'].value;
    }

    if(this.addressForm.controls['cpf'].value){
      this.user.cpf = this.addressForm.controls['cpf'].value;
    }

    if(this.addressForm.controls['phone'].value){
      this.user.phone = this.addressForm.controls['phone'].value;
    }

    if(this.addressForm.controls['password'].value){
      this.user.password = this.addressForm.controls['password'].value;
    }
    //localStorage.setItem('user', JSON.stringify(this.user));
    console.log(this.user);
    this.service.addUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        alert('Dado registrado com sucesso');
      },
      error: (erro: any) => {
        console.log(erro);
        alert('Ocorreu um erro');
      }
    });

  }
}
