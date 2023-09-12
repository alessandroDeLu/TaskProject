import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService { //service per chiamata http

  constructor(private httpModule: HttpClient) {} //importo modulo http

  insertUser(url: string, body:{}){//metodo per chiamata registrazione
    return this.httpModule.post(url , body); //chiedo come parametro l'endpoint per la chiamata e i parametri passati come oggetto

  }//col return otteniamo il risultato della chiamata HTTP effettuata all'URL specificato

  readUser(url: string, body:{}, httpOptions: any){//metodo per chiamata login
    return this.httpModule.post(url, body, httpOptions);//richiedo un ulteriore oggetto che contiene alcune opzioni tra cui il valore true cosi che vengano inclusi i cookie di sessione nella richiesta http
  }

  showAllTask(url:string, httpOptions:any){//metodo per visualizzare tutte le task
    return this.httpModule.get(url, httpOptions);
  }

  showAllCompletedTask(url: string, httpOptions: any){
    return this.httpModule.get(url,httpOptions);
  }

  showAllTaskByDate(url:string, httpOptions: any){
    return this.httpModule.get(url, httpOptions);
  }

  readTask(url: string, httpOptions: any){//metodo per cercare una task
    return this.httpModule.get(url,httpOptions);
  }

  addTask(url:string, body:{}, httpOptions:any){//metodo per inserimento task nella lista
    return this.httpModule.post(url,body,httpOptions);
  }

  completeTask(url: string, body: {}, httpOptions: any){//metodo per completamento task
    return this.httpModule.put(url,body,httpOptions);
  }

  removeTask(url: string, httpOptions: any){//metodo per eliminare una task o tutte le task di un utente, in base alla mail
    return this.httpModule.delete(url,httpOptions);
  }

  downloadReport(url: string, body: {} , httpOptions: any){//metodo per scaricare report excel
    return this.httpModule.post(url,body,httpOptions);
  }

  logout(url: string , body:{}, httpOptions: any){//metodo per chiamata logout
    return this.httpModule.post(url , body, httpOptions);
  }
}
