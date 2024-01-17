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
            url: 'https://google.com',
            shorturl: 'https://google.com'
          },
          {
            id: '2',
            url: 'https://facebook.com',
            shorturl: 'https://facebook.com'
          },
          {
            id: '3',
            url: 'https://twitter.com',
            shorturl: 'https://twitter.com'
          },
          {
            id: '4',
            url: 'https://github.com',
            shorturl: 'https://github.com'
          },
          {
            id: '5',
            url: 'https://youtube.com',
            shorturl: 'https://youtube.com'
          }
        ]);
      }, 1000);
    })
  }
}
