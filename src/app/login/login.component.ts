import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup, FormBuilder } from "@angular/forms";
import { Ilogin } from '../shared/model/user';
import { RegisterServices } from '../shared/services/register';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public showErrorMessage: string;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder,private registerServices: RegisterServices,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      "UserLogin": this.fb.group({
        "emailid": ['', Validators.required],
        "password": ["", Validators.required]
        })
    });
  };
  Save(data: Ilogin) {
    this.submitted = true;
    if (!this.loginForm.valid) { return; }
    console.log(data);
    this.registerServices.loginUser(data).subscribe(item => {
      console.log(item);
      alert("Login DONE");
      this.router.navigateByUrl("/home");
    }, ex => {
        // console.log("something went wrong", ex.error.message);
        this.showErrorMessage = ex.error.message;
    })
   }
}
