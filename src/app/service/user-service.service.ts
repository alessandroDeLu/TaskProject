import { Injectable } from '@angular/core';
import { GestioneUtente } from '../entity/gestione-utente';
import { Utente } from '../entity/utente';

@Injectable({
  providedIn: 'root' // messo a disposizione nella root , nell'intera app
})
export class UserServiceService {

  userLogged!: Utente;
  userLoggedVerified = false;

  gestioneUtente = new GestioneUtente();

  constructor() {}

  addUser(e: Utente){ // metodo per assegnare il valore dell'utente attributo della classe al valore dell'utente preso in ingresso e per aggiungere un utente alla lista presente in gestioneUtente
    this.userLogged = e; //
    this.gestioneUtente.addUserToList(this.userLogged); 
  }

  isVerified(userLogVerify: boolean){ //metodo per modificare il valore booleano a true , viene utilizzato nella home component
    this.userLoggedVerified = userLogVerify;
  }
}
