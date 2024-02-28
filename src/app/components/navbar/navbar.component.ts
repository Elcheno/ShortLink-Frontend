import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject, Inject, effect } from '@angular/core';
import { IRoutes } from '../../entitys/IRoutes';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DropdownComponent, IDropdownData } from '../dropdown/dropdown.component';
import { ModalService } from '../../services/modals/modal.service';
import { CreateShortlinkComponent } from '../links/create-shortlink/create-shortlink.component';
import { ILink } from '../../entitys/ILink';
import { LinkService } from '../../services/link/link.service';
import { environment as env } from '../../../environments/environment.development';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: any;
  @ViewChild('overlay') overlay: any;

  @Input() public inSession!: boolean;

  private readonly sanitizerService = inject(DomSanitizer);
  private readonly modalService = inject(ModalService);
  private readonly linkService = inject(LinkService);
  private readonly authService = inject(AuthService);
  private readonly routerService = inject(Router);

  public isLogged!: boolean;

  private sessionData!: any;

  public routes: IRoutes[] = [
    {
      title: 'Home',
      path: '/home',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
    },
    {
      title: 'About',
      path: '/about',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M16 8h2"/><path d="M16 12h2"/></svg>'
    },
    {
      title: 'Links',
      path: '/links',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
    }
  ];

  public routesLogOut: IRoutes[] = [
    {
      title: 'Home',
      path: '/home',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
    },
    {
      title: 'About',
      path: '/about',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M16 8h2"/><path d="M16 12h2"/></svg>'
    }
  ]

  public dropdownData: IDropdownData<any> = {
    button: {
      icon: '<div class="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></div>'
    },
    rows: [
      {
        title: 'Create ShortLink',
        fnc: async () => {
          ((await this.modalService.open(CreateShortlinkComponent)).closed.subscribe((data: ILink) => {
            this.postShortLink(data);
          }));
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>'
      }
    ]
  }

  public dropdownSession: IDropdownData<any> = {
    button: {},
    header: '',
    rows: [
      {
        title: 'Sing Out',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
        fnc: () => {
          this.authService.logout()
            .then(() => {
              if (this.routerService.url === '/links') {
                this.routerService.navigateByUrl('/home');
              }
            })
        }
      }
    ]
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isLogged = false;
    effect(() => {
      this.isLogged = this.authService.session() ? true : false;
      this.sessionData = this.authService.session();
      if (this.isLogged) {
        this.dropdownSession = {
          ...this.dropdownSession,
          header: this.sessionData?.name
        }
      }
    });
  }

  ngOnInit(): void {
    this.routes = this.routes.map(route => {
      return {
        ...route,
        icon: this.sanitizerService.bypassSecurityTrustHtml(route.icon)
      }
    });

    this.routesLogOut = this.routesLogOut.map(route => {
      return {
        ...route,
        icon: this.sanitizerService.bypassSecurityTrustHtml(route.icon)
      }
    });
  }

  public postShortLink (data: ILink): void {
    if (!data) return;
    this.linkService.create(data).subscribe(
      (res) => {
        if (!res) return;
        const newLink: ILink = { ...res, shortLink: `${env.api.url}/${res.shortLink}` };
        this.linkService.linkList.set([...this.linkService.linkList(), newLink]);
      }
    );
  }

  public toggleSidebar (): void {
    this.sidebar.nativeElement.classList.toggle('transform-none');
    this.overlay.nativeElement.classList.toggle('hidden');
    this.overlay.nativeElement.classList.toggle('fixed');
    this.document.body.classList.toggle('overflow-hidden');
  }
}
