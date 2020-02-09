import { Component, OnInit } from '@angular/core';
import { RegisterServices } from '../shared/services/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public user;
  constructor(private registerServices: RegisterServices, private router: Router) { }

  ngOnInit() {
    this.registerServices.loggedInUser.subscribe(x => {
      console.log(x);
      this.user = x;
    })
  };
  Logout() {
    this.registerServices.Logout();
    this.router.navigateByUrl("/login");
  }

}
