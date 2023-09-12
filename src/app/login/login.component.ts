import { Component , OnInit } from '@angular/core';

import { Utente } from '../entity/utente';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { HttpServiceService } from '../service/http-service.service';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { interval, mergeMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SocialAuthService]
})
export class LoginComponent implements OnInit{  

  constructor(public dialog: MatDialog, private router: Router, private httpService: HttpServiceService, private socialAuthService: SocialAuthService) {}

  mailValue = "";
  passwordValue ="";
  
  emptyValue = false;
  errorMessage = "*Compilare tutti i campi*";

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
    this.errorMessage = "*Compilare tutti i campi*";
    
    //CONTROLLO campi vuoti
    if(!this.mailValue || !this.passwordValue){
      this.emptyValue = true;
    }else{

      let utente = new Utente(this.mailValue,this.passwordValue);
      let url = 'http://localhost:8080/log';
      let httpOptions = { withCredentials: true };//oggetto che contiene alcune opzioni da utilizzare nella richiesta HTTP. Con true vengono inclusi i cookie di sessione nella richiesta http

      //CONTROLLO SE UTENTE REGISTRATO PER LOGIN
      this.httpService.readUser(url , utente, httpOptions).subscribe((result: any) =>{//Senza .subscribe(), la richiesta non verrà inviata poiché le operazioni asincrone in Angular devono essere sottoscritte (subscribed) per essere eseguite.   
        if(result.hasOwnProperty("userAuth")){// se ha la chiave userAuth

          window.sessionStorage.setItem("user" , result["userAuth"]);//salvo nel sessionStorage la mail dell'utente in sessione
          
          this.router.navigate(["/home"])//utilizzo il routing attraverso il router istanziato nel costruttore
        }else if(result.hasOwnProperty("error")){// se ha la chiave error
          this.emptyValue = true;
          this.errorMessage = result["error"]
        }

      })
      
    }
  }



  //CONTROLLO SU LOGIN CON GOOGLE
  ngOnInit(): void {
    let loginUrl = 'http://localhost:8080/log';
    let registerUrl = "http://localhost:8080/register";
    let httpOptions = { withCredentials: true };
    let newGoogleUser: Utente;

    this.socialAuthService.authState.subscribe( user => {//Authstate è una proprieta fornita dal servizio socialAuthService e rappresenta lo stato di autenticazione dell'utente
      //Per cui tutto ciò che c'è all'interno della funzione verrà eseguito ogni volta che lo stato di autenticazione cambia

      if(user != null){
        newGoogleUser = new Utente(user.email, "Passwordutenteaccessogoogle.1");//istanzio l'oggetto Utente con password fissa che verrà poi criptata una volta registrato

        this.httpService.readUser(loginUrl, newGoogleUser, httpOptions).subscribe((result: any) => { 
          if(result.hasOwnProperty("userAuth")){//l'utente è gia registrato? Accedi
            
            window.sessionStorage.setItem("user" , result["userAuth"]);
            this.router.navigate(["/home"])

          }else if(result.hasOwnProperty("error")){//Utente non registrato
            this.httpService.insertUser(registerUrl,newGoogleUser).pipe(mergeMap(() => {//Chiamata al backend per la registrazione
              
              return this.httpService.readUser(loginUrl, newGoogleUser, httpOptions);//metodo pipe(mergeMap) per effettuare la chiamata per il login solo al completamento della registrazione
            })).subscribe((result: any) => {//Observable della chiamata esposta all'esterno
    
              if(result.hasOwnProperty("userAuth")){
                window.sessionStorage.setItem("user" , result["userAuth"]);
                this.router.navigate(["/home"])
              }else if(result.hasOwnProperty("error")){
                this.emptyValue = true;
                this.errorMessage = result["error"]
              }
    
            })
          }
        })
      }

    })
  }

}
