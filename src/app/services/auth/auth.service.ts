import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  constructor() { }

  public checkSession(): boolean {
    return true;
  }

  public async logout(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      window.localStorage.removeItem('sessionData');
      resolve(true);
    });
  }

  public async login(data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.http.post('http://localhost:8200/auth/login', data)
        .subscribe(response => {
          setTimeout(() => {
            console.log(response);
            if (!response) reject(false);
            window.localStorage.setItem('sessionData', JSON.stringify(response));
            resolve(true);
          }, 1000);
        });
    })

  }

  public register(data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.http.post('http://localhost:8200/auth/register', data)
      .subscribe(response => {
        setTimeout(() => {
          console.log(response);
          if (!response) reject(false);
          window.localStorage.setItem('sessionData', JSON.stringify(response));
          resolve(true);
        }, 1000);
      });
    })
  }

}
