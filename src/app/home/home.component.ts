import { Component, OnInit } from '@angular/core';
import { RegisterServices } from '../shared/services/register';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private registerServices: RegisterServices) { }

  ngOnInit() {
    this.registerServices.LoggedInUser().subscribe(item => {
      console.log(item);
    });
  }

}
