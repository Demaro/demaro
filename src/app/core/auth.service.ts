import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
//import * as firebase from 'firebase/app';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<User>;
  data = {};


  is_auth: boolean = false;

  constructor(
    private router: Router
  ) {

  }

  getUser() {
    return this.user.pipe(first()).toPromise();
  }

  googleSignIn() {
    //const provider = new auth.GoogleAuthProvider();
    //return this.oAuthLogin(provider);
  }




}
