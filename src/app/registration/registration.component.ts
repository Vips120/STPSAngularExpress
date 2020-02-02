import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Iregister } from '../shared/model/user';
import { RegisterServices } from '../shared/services/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public userRegister: FormGroup;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder,private regiseterServices: RegisterServices, private router: Router) { }

  ngOnInit() {
    this.userRegister = this.fb.group({
      "firstname": ["", Validators.required],
      "lastname": ["", Validators.required],
      "Age": ["", Validators.required],
      "Address": ["", Validators.required],
      "UserLogin": this.fb.group({
        "emailid": ["", Validators.required],
        "password": ["", Validators.required]
      })
    });
  }
  Save(data: Iregister) {
    this.submitted = true;
    if (!this.userRegister.valid) { return;}
    console.log(data);
    this.regiseterServices.createUser(data).subscribe(item => {
      alert("Registration done!");
      this.router.navigateByUrl("/login");
    })
  }

}
