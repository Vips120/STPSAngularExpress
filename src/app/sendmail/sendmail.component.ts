import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup, FormBuilder } from "@angular/forms";;
import { RegisterServices } from '../shared/services/register';
import { Router } from "@angular/router";
@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.css']
})
export class SendmailComponent implements OnInit {
  public loginForm: FormGroup;
  public showValidmessage: string;
  public showErrorMessage: string;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder, private registerServices: RegisterServices, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      "UserLogin": this.fb.group({
        "emailid": ['', Validators.required]
      })
    });
  }
  Save(data) {
    this.submitted = true;
    console.log(data);
    if (!this.loginForm.valid) { return; }
    this.registerServices.SendMail(data).subscribe((item:any) => {
      console.log(item);
      this.showValidmessage = item.message;
    }, ex => {
        // console.log("something went wrong", ex.error.message);
        this.showErrorMessage = ex.error.message;
    })
   }
}
