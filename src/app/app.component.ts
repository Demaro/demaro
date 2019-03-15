import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  jaja = "jaja";

  public html: string = '<span class="btn btn-danger">Your HTML here</span>';

  constructor(private swUpdate: SwUpdate, public auth: AuthService ) {
  }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if(confirm("Nueva version disponible, desea actualizarla?")) {
              window.location.reload();
          }
        });
  }
}

scroll(id) {

  console.log('el id: ', id);
  const el = document.getElementById(id);
  el.scrollIntoView();
}

loginGoogle(){
  this.auth.googleSignIn()
  .then(data => {
    console.log(data)
  })
  .catch(err=>{
    console.log(err)
  })
}
}


