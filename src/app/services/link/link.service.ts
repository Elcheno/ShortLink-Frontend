import { Injectable, inject, signal } from '@angular/core';
import { ILink } from '../../entitys/ILink';
import { Observable, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  public linkList = signal<ILink[]>([]);

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjE3MDk0OTc0MTksImlhdCI6MTcwODg5MjYxOH0.GibYttLJp_y6vluKJz0y3ewQ9Zxmrlnex4uNUwv8Rlw';

  public async getMockListLink(): Promise<ILink[]> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Google',
            url: 'https://google.com',
            shortLink: 'https://google.com'
          },
          {
            id: '2',
            name: 'Facebook',
            url: 'https://facebook.com',
            shortLink: 'https://facebook.com'
          },
          {
            id: '3',
            name: 'Twitter',
            url: 'https://twitter.com',
            shortLink: 'https://twitter.com'
          },
          {
            id: '4',
            name: 'Github',
            url: 'https://github.com',
            shortLink: 'https://github.com'
          },
          {
            id: '5',
            name: 'Youtube',
            url: 'https://youtube.com',
            shortLink: 'https://youtube.com'
          }
        ]);
      }, 1000);
    })
  }

  public getAll (page: number): Observable<ILink[]> {
    const token = this.authService.session()?.token;
    return this.http.get<ILink[]>(env.api.url + env.api.link + `/page/${ page }`, { headers: { 'Authorization': `Bearer ${ this.mockToken }` } })
      .pipe(
        map((res: any) => {
          const response: ILink[] = res.map((item: any) => {
            return { ...item, shortLink: `${env.api.url}/${item.shortLink}` }
          })
          return response;
        }),
        take(1)
      );
  }

  public getById (id: string): Observable<ILink> {
    const token = this.authService.session()?.token;
    return this.http.get<ILink>(env.api.url + env.api.link + `/${ id }`, { headers: { 'Authorization': `Bearer ${ this.mockToken }` } })
      .pipe(
        map((res: any) => {
          const response: ILink = { ...res }
          return response;
        }),
        take(1)
      );
  }

  public create (data: ILink): Observable<ILink> {
    const token = this.authService.session()?.token;
    return this.http.post<ILink>(env.api.url + env.api.link, data, { headers: { 'Authorization': `Bearer ${ this.mockToken }` } })
      .pipe(
        map((res: any) => {
          const response: ILink = { ...res }
          return response;
        }),
        take(1)
      );
  }

  public update (data: ILink): Observable<ILink> {
    const token = this.authService.session()?.token;
    return this.http.put<ILink>(`http://localhost:8200/link/${ data.id }`, data, { headers: { 'Authorization': `Bearer ${ this.mockToken }` } })
      .pipe(
        map((res: any) => {
          const response: ILink = { ...res }
          return response;
        }),
        take(1)
      );
  }

  public delete (id: string): Observable<ILink> {
    const token = this.authService.session()?.token;
    return this.http.delete<ILink>(`http://localhost:8200/link/${ id }`, { headers: { 'Authorization': `Bearer ${ this.mockToken }` } })
      .pipe(
        map((res: any) => {
          const response: ILink = { ...res }
          return response;
        }),
        take(1)
      );
  }
}
