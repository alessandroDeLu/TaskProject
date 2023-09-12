import { Component , OnInit} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { ToolbarBasicExample } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TaskListComponent } from '../task-list/task-list.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, ToolbarBasicExample, FooterComponent, TaskListComponent]
})
export class HomeComponent implements OnInit{

  constructor(public router: Router){}

  ngOnInit(): void { 
   if(window.sessionStorage.getItem("user") == null){//se il valore dell attributo utenteLoggato salvato nel sessionStorage, che viene assegnato al login, è null allora ritorna alla pagina di login
      this.router.navigate(['']);
    } 
  }  


}
