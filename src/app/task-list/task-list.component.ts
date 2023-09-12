import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './task';
import { HttpServiceService } from '../service/http-service.service';
import { MatIconModule } from '@angular/material/icon';
import { mergeMap } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule , MatIconModule]
})
export class TaskListComponent implements OnInit {

  constructor(private httpService: HttpServiceService){}

  firstButton = true;

  ngOnInit(): void {
    let httpOptions = { withCredentials: true };

    if(this.firstButton){//se il bottone task viene premuto
      let url = "http://localhost:8080/readAllTask?email=" + this.userMail;
      this.httpService.showAllTask(url, httpOptions).subscribe((result: any) => {
        this.taskList = result["taskList"];// richiamo il metodo per leggere tutte le task e assegno il result contenente la lista all array
        this.orderBy = "Priorità";
      })
    }else{//altrimenti vedo solo quelle completate
      let url = "http://localhost:8080/readAllCompletedTask?email=" + this.userMail;
      this.httpService.showAllCompletedTask(url,httpOptions).subscribe((result: any) => {
        this.taskList = result["taskList"];
        this.orderBy = "Priorità";
      })
    }

  }

  //CLICK BOTTON TASKLIST
  onClickFirstBtn(e:Event){//al click imposto la flag a true per vedere quelli da completare
    this.firstButton = true;
    this.ngOnInit();
  }

  //CLICK BUTTON TASK COMPLETED
  onClickSecondBtn(e: Event){//imposto la flag a false per vedere quelli completati
    this.firstButton = false;
    this.ngOnInit();
  }

  userMail = window.sessionStorage.getItem("user");//recupero la mail dell'utente in sessione
  descrizione = "";
  taskPriority = false;
  dataScadenza: any;
  completata = false;

  taskList: any[] = [];

  //leggo valore input
  onReadValue(e: Event){
    this.descrizione = (<HTMLInputElement>e.target).value;
  }

  //leggo valore checkbox
  onReadValueCheckbox(e: Event){
    this.taskPriority = (<HTMLInputElement>e.target).checked;
  }

  //leggo valore data scadenza
  onReadDate(e:Event){
    this.dataScadenza = (<HTMLInputElement>e.target).value; 
  }

  //al click add task
  onClick(e:Event){
    let myDate = new Date(this.dataScadenza);//data scadenza selezionata del tipo Date
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Imposta l'ora a mezzanotte per la data odierna
    if(!this.descrizione){//se il campo è vuoto
      alert("Attenzione: inserire task");
    }else if(this.dataScadenza == null || myDate.getTime() < today.getTime()){//se non viene inserita la data o se viene selezionata una data precedente a quella odierna
        alert("Attenzione: data scadenza non valida");
    }else{//se va bene tutto

      let task = new Task(this.descrizione, this.dataScadenza, this.completata, this.taskPriority, this.userMail);
      let urlToAddTask = "http://localhost:8080/addTask";
      let httpOptions = { withCredentials: true };
  
      this.httpService.addTask(urlToAddTask , task , httpOptions).subscribe((result: any) => {
        this.ngOnInit();
      })
    }
  }


  //al click task completata
  onClickCompleted(e:Event, taskId: any){
    let task: any;
    let taskUrl = "http://localhost:8080/readTask?id=" + taskId;
    let completeTaskUrl = "http://localhost:8080/completeTask";
    let httpOptions = { withCredentials: true };

    // .pipe(mergeMap) Permette di eseguire la chiamata per completare il task solo quando i dati del task sono stati ottenuti dalla chiamata readTask.
    // Cosi facendo si gestisce in modo sequenziale l'invio delle richieste HTTP
    // .pipe() permette di comporre una sequenza di operatori da applicare agli observables, creando una catena di trasformazioni dei dati
    // mergeMap è un operatore utilizzato per trasformare ogni elemento emesso dall'observable in un nuovo observable. 
    // La funzione passata a mergeMap verrà chiamata per ogni elemento emesso dall'observable sorgente.
    this.httpService.readTask(taskUrl, httpOptions).pipe(mergeMap((result: any) => {
        task = result["task"];
        for(let tsk of this.taskList){//scorro l'array taskList corrispondente all'arrayList restituito da backend
          if(tsk.id == task.id){//se l'id della task restituita dal primo observable è uguale all'id di una task presente nell array
            tsk.completata = true;
            task = tsk;// assegno il valore della task a tsk cosi che vedo istantaneamente il cambiamento al click senza attendere il refresh 
            break;
          }
        }  
        
        return this.httpService.completeTask(completeTaskUrl, task, httpOptions);//return per specificare quale observable deve essere propagato all'esterno della catena di operatori.
      })
    ).subscribe((result: any) => {
      setTimeout(() => {
        this.ngOnInit();
      }, 500);
      } 
    );
  }


  //al click del delete task
  onClickDelete(e: Event, idTask: any){
    let url = "http://localhost:8080/task/" + idTask;
    let httpOptions = { withCredentials: true };

    this.httpService.removeTask(url, httpOptions).subscribe((result: any) => {
      this.ngOnInit();
    })
  }


  //al click del download report
  onClickDownload(e: Event){

    let url = "http://localhost:8080/download";
    let httpOptions = { withCredentials: true };

    this.httpService.downloadReport(url,this.taskList,httpOptions).subscribe((result: any) => {
    
      if(result.hasOwnProperty("message")){
        
        let byteCharacters = atob(result["fileExcel"]);// Decodifica la stringa Base64 in un array di byte
        
        //trasformazione della stringa decodificata dalla codifica Base64 byteCharacters in un array di byte, dove ogni byte rappresenta il valore numerico Unicode di un carattere corrispondente nella stringa.
        let byteArray = new Uint8Array(byteCharacters.length);//oggetto Uint8Array (array di byte senza segno a 8 bit) con una lunghezza uguale alla lunghezza della stringa byteCharacters. Questo array di byte sarà utilizzato per contenere i valori numerici corrispondenti ai caratteri nella stringa Base64 decodificata.
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);//Assegniamo il valore numerico ottenuto all'elemento corrispondente nel byteArray. Questo sta "convertendo" il carattere in un valore numerico e memorizzandolo nell'array di byte.
        }

        let blobFile = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });//creazione oggetto Blob utilizzando l'array di byte decodificato e il tipo MIME corretto per i file Excel basati su formato XML.
        saveAs(blobFile, 'TaskList.xls');//metodo per avviare il download del file Excel con il nome "TaskList.xls".
      }else{
        alert(result["error"])
      }
      
    })

  }


  //ORDINA PER DATASCADENZA O PRIORITA'
  orderBy = "";
  dropDownVisible = false;
  orderChoice = "";

  //click per scegliere ordine task
  onClickDropDown(e:Event){ 
    this.dropDownVisible = !this.dropDownVisible; // Inverte lo stato del dropdown cosi che ad ogni click si apre e si chiude
  }

  //ordine in base alla priorità
  @ViewChild('priority') priorityChoice: ElementRef | any;//recupero il riferimento all'elemento HTML
  onClickPriority(e:Event){
    this.orderChoice = this.priorityChoice.nativeElement.textContent; //accedo ed assegno alla variabile il testo contenuto nell'elemento html
    this.orderBy = this.orderChoice; 
    this.dropDownVisible = false;

    let url = "http://localhost:8080/readAllTask?email=" + this.userMail;
    let httpOptions = { withCredentials: true };
    this.httpService.showAllTask(url, httpOptions).subscribe((result: any) => {
      this.taskList.sort((a,b) => {
        return b.taskPriority - a.taskPriority;
      })
    })
  }

  //ordine in base alla data di scadenza
  @ViewChild('date') expiringDateChoice: ElementRef | any;
  onClickDate(e:Event){
    this.orderChoice = this.expiringDateChoice.nativeElement.textContent;
    this.orderBy = this.orderChoice;
    this.dropDownVisible = false;
    
    let url = "http://localhost:8080/readByExpiringDate?email=" + this.userMail;
    let httpOptions = { withCredentials: true };
    this.httpService.showAllTaskByDate(url, httpOptions).subscribe((result: any) => {
      this.taskList.sort((a,b)=>{//ordino array in base alla data di scadenza
        let maxDate = new Date(a.dataScadenza).getTime();
        let minDate = new Date(b.dataScadenza).getTime();

        return maxDate - minDate;//restituisce valore negativo se minDate è antecedente a maxDate, quindi task b deve essere prima del task a

      })
    })
  }


}
