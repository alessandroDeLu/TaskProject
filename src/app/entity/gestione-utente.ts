import { Utente } from "./utente";

export class GestioneUtente{
    listaUtenti: Utente[] = []; //attributo array di utenti

    constructor(){
        this.listaUtenti.push(new Utente("marco@gmail.com", "Marcolino.123"))
        this.listaUtenti.push(new Utente("paolo@gmail.com", "Paolino.123"))
    }

    addUserToList(e: Utente){//  metodo per aggiungere utente alla lista
        this.listaUtenti.push(e);
    }
}