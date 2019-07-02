import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from 'firebase';

import decode from 'jwt-decode';


@Injectable({
  providedIn:  'root'
})
export class AuthService {
  user: User;

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.subscribeToFireAuth();
  }

  public isAuthenticated(): boolean {
      // const token = localStorage.getItem('auth_token');
      // Check whether the token is expired and return true or false
      // return !this.jwtHelper.isTokenExpired(token);
      return false;
  }

  loginAnonymous(): void { }
  loginEmail(): void { }
  loginPhone(): void { }
  loginGithub(): void { }
  loginGoogle(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      });
    });
  }

  private subscribeToFireAuth() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  register(value): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

}

@Injectable({
  providedIn:  'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}