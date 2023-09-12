import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { DialogComponent } from './dialog/dialog.component';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { HomeComponent } from './home/home.component';
import { ToolbarBasicExample } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TaskListComponent } from './task-list/task-list.component';

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogComponent,
    DialogModalComponent,
    HomeComponent,
    ToolbarBasicExample,
    FooterComponent,
    TaskListComponent,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [// SEZIONE DEI SERVICES E PER IL LOGIN CON GOOGLE 
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '799045271482-7j67jeejnka7jmd6dfra74soumheg7aa.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,// viene riferito al compilatore che il valore presente in useValue viene assegnato al tipo SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
