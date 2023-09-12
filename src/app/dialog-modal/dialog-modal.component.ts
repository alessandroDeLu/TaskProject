import { Component } from '@angular/core';

import { Utente } from '../entity/utente';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from '../service/http-service.service';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css'],
  imports: [ CommonModule , BrowserModule ],
  standalone: true
})
export class DialogModalComponent {
  constructor(private dialog: MatDialog , private httpService: HttpServiceService){} //istanzio nel costruttore il service creato per la chiamata http

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

  onReadMail(e: Event){//prendo valore mail
    this.email = (<HTMLInputElement>e.target).value;
  }

  onReadPassword(e: Event){//prendo valore pssw
    this.password = (<HTMLInputElement>e.target).value;
  }

  onReadPasswordConfirmed(e: Event){//prendo valore conferma pssw
    this.passwordConfirmed = (<HTMLInputElement>e.target).value;
  }

  onClickSignUp(e: Event){ //evento al click
    this.finalError = "";
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
      } //controlli sui campi

      if(this.resultPssw && this.resultMail && this.resultConfirmPssw){
        this.errorMessage = '';
        let newUser = new Utente(this.email, this.password);//istanzio l'oggetto user

        this.httpService.insertUser("http://localhost:8080/register" , newUser).subscribe((data: any) => {
          //dal service http utilizzo il metodo insertUser per la chiamata post , la funzione subscribe viene utilizzata per sottoscriversi all'Observable restituito dalla chiamata HTTP, consentendo di ottenere la risposta del server
          if(data.hasOwnProperty("message")){//se l'oggetto data ha una chiave chiamata "message" mostrami il messaggio.
            this.noValue = true;
            this.errorMessage = data["message"];
            setTimeout(function(){
              location.reload();
            } , 1300)
          }else if(data.hasOwnProperty("error")){
            this.noValue = true;
            this.errorMessage = data["error"]
          }
        });

      }

    }
  }

  onClickCloseModal(e: Event){ //chiusura modal al click della x
    this.dialog.closeAll();
  }
}
