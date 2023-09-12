import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpServiceService } from '../service/http-service.service';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {

  constructor(private httpService: HttpServiceService){}

  contactClick = false;
  aboutClick = false;
  restoreClick = false;

  //CONTACTS
  onClickContacts(e: Event){
    this.contactClick = !this.contactClick;
    this.aboutClick = false;
    this.restoreClick= false;
  }

  onClickCloseContacts(e: Event){
    this.contactClick = false;
  }

  //ABOUT US
  onClickAboutUs(e: Event){
    this.contactClick = false;
    this.restoreClick = false;
    this.aboutClick = !this.aboutClick;
  }

  onClickCloseAboutUs(e: Event){
    this.aboutClick = false;
  }

  //RESTORE LIST
  onRestoreList(e: Event){
    this.restoreClick = !this.restoreClick;
    this.aboutClick = false;
    this.contactClick = false;
    document.body.style.background = "rgba(0,0,0,.4)"; 
  }

  onClickClearList(e: Event){
    let url = "http://localhost:8080/deleteAll";
    let httpOptions = { withCredentials: true};

    this.httpService.removeTask(url, httpOptions).subscribe((result: any) => {
      this.restoreClick = false;
      alert(result["message"]);
      location.reload();
    })

  }

  onClickCloseClear(e: Event){
    this.restoreClick = false;
    document.body.style.background = "radial-gradient(circle, rgba(250, 235, 215, 0.305) 20%, rgba(240, 182, 10, 0.348) 82%)"; 
  }

  onClickInsta(e: Event){
    window.open("https://instagram.com/delucalessandro?igshid=YTQwZjQ0Nml0OA==" , "_blank");
  }

  onClickFacebook(e: Event){
    window.open("https://www.facebook.com/alessandro.deluca.319", "_blank");
  }

}
