import { Component } from '@angular/core';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

@Component({
  selector: 'dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class DialogComponent {
  constructor(public dialog: MatDialog) {} //istanzio l'oggetto MatDialog

  openDialog(e: Event) {
    e.preventDefault();// metodo per impedire la ricarica automatica al click
    this.dialog.open(DialogElementsExampleDialog); //metodo per aprire la classe della modale sottostante
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-modal/dialog-modal.component.html',
  styleUrls: ['../dialog-modal/dialog-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
})
class DialogElementsExampleDialog extends DialogModalComponent {}// classe della modale estende la classe del componente creato
