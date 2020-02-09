import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SendmailComponent } from './sendmail/sendmail.component';


const routes: Routes = [{
  path: "",
  component: LoginComponent
},
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "forgotpassword/:id",
    component: ForgotpasswordComponent
  },
  {
    path: "sendmail",
    component: SendmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
