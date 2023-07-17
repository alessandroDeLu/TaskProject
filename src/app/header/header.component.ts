import { Component , OnInit } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, CommonModule]
})
export class ToolbarBasicExample implements OnInit{

  constructor(public userService: UserServiceService){}

  userLogged = this.userService.userLogged; //valore dell user loggato

  isUserLogged = false;

  ngOnInit(): void { //all'inizializzazione del componente verifico se l'utente che si logga si è registrato oppure era uno di qeulli fittizi
    if(this.userLogged != null){
      this.isUserLogged = true;
    }
  }

}