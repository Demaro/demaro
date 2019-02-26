import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  loginGoogle(){
    this.auth.googleSignIn()
    .then(data => {
      console.log(data)
    })
  }

  scroll(id) {
    console.log('el id: ', id);
    const el = document.getElementById(id);
    el.scrollIntoView();
  }

}
