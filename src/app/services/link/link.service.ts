import { Injectable } from '@angular/core';
import { Link } from '../../entitys/Link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  public async getMockListLink(): Promise<Link[]> {
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
}
