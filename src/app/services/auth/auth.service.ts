import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  public session = signal(null);

  constructor() { }

  public setSession(data: any): void {
    this.session.set(data);
  }

  public async loadSession(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      const sessionData = window.localStorage.getItem('sessionData');
      if (sessionData) {
        console.log(JSON.parse(sessionData));
        this.setSession(JSON.parse(sessionData));
        resolve(true);
      }
      resolve(false);
    })
  }

  public checkSession(): boolean {
    return this.session() !== null;
  }

  public async logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        // window.localStorage.removeItem('sessionData');
        this.setSession(null);
        resolve(true);

      } catch (error) {
        console.error(error);
        reject(false);
        
      }
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
