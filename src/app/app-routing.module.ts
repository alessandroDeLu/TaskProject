import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'log', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


///@NgModule
//imports: [RouterModule.forRoot(routes)]
//Nel codice fornito, viene importato il modulo RouterModule 
//utilizzando il metodo forRoot(routes). 
//RouterModule è un modulo di routing fornito da Angular che consente di 
//gestire il routing all'interno dell'applicazione. forRoot(routes) è un
//metodo statico che accetta un array di oggetti routes, 
//che definisce le rotte dell'applicazione

//exports: [RouterModule]
//Questa riga esporta i moduli del router per renderli disponibili 
//ad altri moduli che lo importano