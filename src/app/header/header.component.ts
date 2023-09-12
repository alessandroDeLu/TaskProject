import { Component, OnInit } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { HttpServiceService } from '../service/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, CommonModule]
})
export class ToolbarBasicExample implements OnInit{

  constructor(private router: Router, private httpService: HttpServiceService){}

  mailUser: any;

  ngOnInit(): void {
    this.mailUser = window.sessionStorage.getItem("user");//mostra mail utente loggato sulla navbar
  }

  onLogout(e: Event){
    let url = "http://localhost:8080/exit";
    let httpOptions = { withCredentials: true };//oggetto che contiene alcune opzioni da utilizzare nella richiesta HTTP. Con true vengono inclusi i cookie di sessione nella richiesta http

    this.httpService.logout(url, {}, httpOptions).subscribe((result: any) => {
      if(result["userAuth"] == null){//se la mail dell utente proveniente dall'autenticazione invalidata è null
        alert(result["message"]);
        window.sessionStorage.clear();
        this.router.navigate([""]);//torna alla login page
      }

    })
  }

}