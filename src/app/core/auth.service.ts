import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

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
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    return this.user.pipe(first()).toPromise();
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user)
    })

  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    var name = user.displayName.replace(/ .*/,'');

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }
}
