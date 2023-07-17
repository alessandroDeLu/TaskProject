import { Component , OnInit} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { ToolbarBasicExample } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TaskListComponent } from '../task-list/task-list.component';

import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, ToolbarBasicExample, FooterComponent, TaskListComponent]
})
export class HomeComponent implements OnInit{

  constructor(public userService: UserServiceService, public router: Router){}

   ngOnInit(): void { //se l'attributo  nel service, che viene verificato al login, è false allora ritorna alla pagina di login
    if(!this.userService.userLoggedVerified){
      this.router.navigate(['']);
    }
  }  


}
