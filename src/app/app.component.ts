import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  jaja = "jaja";

  constructor(private swUpdate: SwUpdate ) {
  }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("Nueva version de impulsa, desea actualizarla?")) {

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
}


