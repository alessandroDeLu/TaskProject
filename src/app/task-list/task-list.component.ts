import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './task';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TaskListComponent {

  taskName = "";
  priorityCheck = false;
  taskPriority = "";
  taskCompleted = false;

  priority = "";

  taskList: any[] = [];

  property = "none";

  //leggo valore input
  onReadValue(e: Event){
    this.taskName = (<HTMLInputElement>e.target).value;
  }

  //leggo valore checbox
  onReadValueCheckbox(e: Event){
    this.priorityCheck= (<HTMLInputElement>e.target).checked;
  }

  //al click del bottone inserisco il valore dell input nella lista
  onClick(e: Event){

    let task = new Task(this.taskName, this.priorityCheck, this.taskPriority, this.taskCompleted); //istanzio oggetto task al click

    if(!task.name){
      alert("Insert task")
    }else{
      this.priority = task.priority; //se è vuoto il campo alert se è riempito controllo se ha fleggato il check della priorita

      if(task.checked){
        task.priority = "high";
      }else{
        task.priority = "normal";
      }
  
      this.taskList.push(task);
   }

  }

  //al click del bottone done
  onClickDone(task: Task){
    task.completed = true;
  }


}
