import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { DialogComponent } from './dialog/dialog.component';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { HomeComponent } from './home/home.component';
import { ToolbarBasicExample } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogComponent,
    DialogModalComponent,
    HomeComponent,
    ToolbarBasicExample
  ],
  providers: [], // SEZIONE DEI SERVICES
  bootstrap: [AppComponent]
})
export class AppModule {}
