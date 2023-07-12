import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule]
})
export class ToolbarBasicExample{
  constructor(public userService: UserServiceService){}

  userLogged = this.userService.userLogged;
}
