import { Injectable, inject } from '@angular/core';
import { ILink } from '../../entitys/ILink';
import { Observable, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private readonly http = inject(HttpClient);

  constructor() { }

  public async getMockListLink(): Promise<ILink[]> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Google',
            url: 'https://google.com',
            shorturl: 'https://google.com'
          },
          {
            id: '2',
            name: 'Facebook',
            url: 'https://facebook.com',
            shorturl: 'https://facebook.com'
          },
          {
            id: '3',
            name: 'Twitter',
            url: 'https://twitter.com',
            shorturl: 'https://twitter.com'
          },
          {
            id: '4',
            name: 'Github',
            url: 'https://github.com',
            shorturl: 'https://github.com'
          },
          {
            id: '5',
            name: 'Youtube',
            url: 'https://youtube.com',
            shorturl: 'https://youtube.com'
          }
        ]);
      }, 1000);
    })
  }


  public create(data: ILink): Observable<ILink> {
    return this.http.post<ILink>('http://localhost:8200/shortlink', data)
      .pipe(
        map((res: any) => {
          const response: ILink = {
            ...res
          }
          return response;
        }),
        take(1)
      );
  }
}
