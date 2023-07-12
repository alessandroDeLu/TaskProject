import { Component } from '@angular/core';

import { Utente } from '../entity/utente';

import { UserServiceService } from '../service/user-service.service';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css'],
  imports: [ CommonModule , BrowserModule ],
  standalone: true
})
export class DialogModalComponent {
  constructor(private userService: UserServiceService){}

  email = "";
  password = "";
  passwordConfirmed = "";

  noValue = false;

  errorMessage = "*Compilare tutti i campi*";
  finalError = "";
  emptyEmailError = "*Attenzione: indirizzo mail non inserito*"
  invalidEmailError = "*Attenzione: indirizzo mail non valido*"
  emptyPasswordError = "*Attenzione: password non inserita*"
  invalidPasswordError = "*Attenzione: la password deve contenere almeno 8 caratteri, tra cui almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale*"
  emptyConfirmPasswordError = "*Attenzione: conferma password non inserita*"
  invalidConfirmPasswordError = "*Attenzione: la password di conferma deve corrispondere alla password precedentemente inserita*"

  resultMail = true;
  resultPssw = true;
  resultConfirmPssw = true;

  mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  psswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  onReadMail(e: Event){
    this.email = (<HTMLInputElement>e.target).value;
  }

  onReadPassword(e: Event){
    this.password = (<HTMLInputElement>e.target).value;
  }

  onReadPasswordConfirmed(e: Event){
    this.passwordConfirmed = (<HTMLInputElement>e.target).value;
  }

  onClickSignUp(e: Event){
    if(!this.email && !this.password && !this.passwordConfirmed){
      this.noValue = true;
    }else if(!this.email){
      this.noValue = true;
      this.finalError += this.emptyEmailError + '\n' + this.invalidEmailError + '\n'
      this.errorMessage = this.finalError;
    }else if(!this.password){
      this.noValue = true;
      this.finalError += this.emptyPasswordError + '\n' + this.invalidPasswordError + '\n'
      this.errorMessage = this.finalError;
    }else if(!this.passwordConfirmed){
      this.noValue = true;
      this.finalError += this.emptyConfirmPasswordError + '\n' + this.invalidConfirmPasswordError + '\n'
      this.errorMessage = this.finalError;
    }else{
      
      if(!this.mailRegex.test(this.email)){
        this.noValue = true;
        this.resultMail = false;
        this.finalError += this.invalidEmailError + '\n'
        this.errorMessage = this.finalError
      }else{
        this.resultMail = true;
      }

      if(!this.psswRegex.test(this.password)){
        this.noValue = true;
        this.resultPssw = false;
        this.finalError += this.invalidPasswordError + '\n'
        this.errorMessage = this.finalError
      }else{
        this.resultPssw = true;
      }

      if(this.password != this.passwordConfirmed){
        this.noValue = true;
        this.resultConfirmPssw = false;
        this.finalError += this.invalidConfirmPasswordError + '\n'
        this.errorMessage = this.finalError
      }else{
        this.resultConfirmPssw=true;
      }

      if(this.resultPssw && this.resultMail && this.resultConfirmPssw){
        this.errorMessage = '';
        let utenteRegistrato = false;

        let newUser = new Utente(this.email, this.password);

        for(let utente of this.userService.gestioneUtente.listaUtenti){
          if(utente.email == newUser.email && utente.password == newUser.password){
            utenteRegistrato = true;
          }
        }

        if(utenteRegistrato){
          alert("Utente gia registrato");
        }else{
          this.userService.addUser(newUser); //aggiungo utente alla lista e salvo l'utente come attributo nella classe del servizio
          alert("Utente registrato con successo");
        }

      }

    }

  }
}
