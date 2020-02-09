import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup, FormBuilder } from "@angular/forms";;
import { RegisterServices } from '../shared/services/register';
import { Router,ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public loginForm: FormGroup;
  public showValidmessage: string;
  public showErrorMessage: string;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder, private registerServices: RegisterServices, private router: Router, private AR: ActivatedRoute) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      "UserLogin": this.fb.group({
        "password": ['', Validators.required]
      })
    });
  }
  Save(data) {
    this.submitted = true;
    console.log(data);
    if (!this.loginForm.valid) { return; }
    this.AR.params.subscribe(item => {
      let id = item['id'];
      console.log(id);
      this.registerServices.Forgotpassword(id,data)
        .subscribe((item: any) => {
          console.log(item);
          alert("password updated");
          this.router.navigateByUrl("/login");
        // this.showValidmessage = item.message;
      }, ex => {
          // console.log("something went wrong", ex.error.message);
          this.showErrorMessage = ex.error.message;
      })
    })
 
   }

}
