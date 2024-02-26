import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  public session = signal<any>(null);

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
      setTimeout(() => {
        try {
          // window.localStorage.removeItem('sessionData');
          this.setSession(null);
          this.toastService.showToast('Logged out successfully', 'success');
          resolve(true);
  
        } catch (error) {
          console.error(error);
          reject(false);
          
        }
      }, 500);
    });
  }

  public login(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8200/auth/login', data)
      .pipe(
        map((res: any) => {
          if (!res) return null;
          this.setSession(res);
          window.localStorage.setItem('sessionData', JSON.stringify(res));
          this.toastService.showToast('Logged in successfully', 'success');
          return res;
        }),
        take(1)
      );
  }

  public register(data: any): Observable<boolean> {
    return this.http.post<any>('http://localhost:8200/auth/register', data)
      .pipe(
        map((res: any) => {
          if (!res) return null;
          this.setSession(res);
          window.localStorage.setItem('sessionData', JSON.stringify(res));
          this.toastService.showToast('Registered successfully', 'success');
          return res;
        }),
        take(1)
      );
  }

}
