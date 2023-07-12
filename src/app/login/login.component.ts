import { Component, OnInit } from '@angular/core';

import { Utente } from '../entity/utente';

import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component'; 
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{  
  
  dialogInstance: DialogComponent;

  constructor(public dialog: MatDialog, private userService: UserServiceService, private router: Router) {
    this.dialogInstance = new DialogComponent(dialog);
  }

  mailValue = "";
  passwordValue ="";
  
  emptyValue = false;
  finalError = "";
  errorMessage = "*Compilare tutti i campi*";
  emptyEmailError = "*Attenzione: indirizzo mail non inserito*"
  invalidEmailError = "*Attenzione: indirizzo mail non valido*"
  emptyPasswordError = "*Attenzione: password non inserita*"
  invalidPasswordError = "*Attenzione: la password deve contenere almeno 8 caratteri, tra cui almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale*"
  invalidCredentials = "Attenzione: credenziali non valide";

  resultMail = true;
  resultPssw = true;

  mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  psswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  //Prendo valore input mail
  onReadMail(e: Event){
    this.mailValue = (<HTMLInputElement>e.target).value;
  }

  //prendo valore input password
  onReadPassword(e: Event){
    this.passwordValue = (<HTMLInputElement>e.target).value;
  }

  //al click di Sign in
  onClickLogin(e: Event){
    this.finalError = "";  

    //CONTROLLO campi vuoti
    if(!this.mailValue && !this.passwordValue){
      this.emptyValue = true;
    }else if(!this.mailValue){
        this.emptyValue = true;
        this.finalError += this.emptyEmailError + '\n' + this.invalidEmailError + '\n'
        this.errorMessage = this.finalError;
    }else if(!this.passwordValue){
        this.emptyValue = true;
        this.finalError += this.emptyPasswordError + '\n' + this.invalidPasswordError + '\n'
        this.errorMessage = this.finalError;
    }else{

      //CONTROLLO campi corretti
      if(!this.mailRegex.test(this.mailValue)){
        this.emptyValue = true;
        this.finalError += this.invalidEmailError + '\n'
        this.errorMessage = this.finalError;
        this.resultMail = false;
      }else{
        this.resultMail = true;
      }

      if(!this.psswRegex.test(this.passwordValue)){
        this.emptyValue = true;
        this.finalError += this.invalidPasswordError + '\n'
        this.errorMessage = this.finalError;
        this.resultPssw = false
      }else{
        this.resultPssw = true;
      }

      //SE CORRETTI
      if(this.resultPssw && this.resultMail){
        this.errorMessage = "";

        let user = new Utente(this.mailValue, this.passwordValue);
        let userTrovato = false;

        for(let utente of this.userService.gestioneUtente.listaUtenti){
          if(utente.email == user.email && utente.password == user.password){
           userTrovato = true; 
          }
        }

        //CONTROLLO SE UTENTE PRESENTE NELLA LISTA UTENTI REGISTRATI
        if(userTrovato){
          this.router.navigateByUrl("/home")//utilizzo il routing attraverso il router istanziato nel costruttore
        }else{
          this.emptyValue = true;
          this.errorMessage = this.invalidCredentials;
        }
        
      }

    }
  }  

  ngOnInit(): void {
    
  }

}
