import { Component, OnInit, effect, inject } from '@angular/core';
import { Link } from '../../entitys/Link';
import { LinkService } from '../../services/link/link.service';
import { AuthService } from '../../services/auth/auth.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DropdownComponent, IDropdownData } from '../../components/dropdown/dropdown.component';

@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [ClipboardModule, DropdownComponent],
  templateUrl: './link-list.component.html',
  styleUrl: './link-list.component.scss'
})
export class LinkListComponent implements OnInit {

  private linkService = inject(LinkService);
  private authService = inject(AuthService);
  
  public linkList!: Link[];

  public clipboard: string = '';

  public dropdownData: IDropdownData<Link> = {
    header: 'Link',
    button: {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>'
    },
    rows: [
      {
        title: 'Copy',
        fnc: (data: any) => {
          console.log(data);
          this.copyToClipboard(data.shorturl);
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
      },
      {
        title: 'Edit',
        fnc: (data: any) => {
          console.log(data);
          this.copyToClipboard(data.shorturl);
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>'
      },
      {
        title: 'Remove',
        fnc: (data: any) => {
          console.log(data);
          this.copyToClipboard(data.shorturl);
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'
      }
    ]
  }

  constructor() {
    effect(async () => {
      if (this.authService.session() !== null) { 
        this.linkService.getMockListLink()
          .then(res => this.linkList = res);
      } else {
        this.linkList = [];
      }
    })
  }
  
  ngOnInit(): void {}

  public copyToClipboard (clipboardString: string): void {
    this.clipboard = clipboardString;
    setTimeout(() => {
      this.clipboard = '';
    }, 4000);
  }

}
