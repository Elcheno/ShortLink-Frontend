import { Component, OnInit, effect, inject } from '@angular/core';
import { ILink } from '../../entitys/ILink';
import { LinkService } from '../../services/link/link.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DropdownComponent, IDropdownData } from '../../components/dropdown/dropdown.component';
import { ModalService } from '../../services/modals/modal.service';
import { UpdateShortlinkComponent } from '../../components/links/update-shortlink/update-shortlink.component';
import { ConfirmService } from '../../services/modals/confirm.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [ClipboardModule, DropdownComponent],
  templateUrl: './link-list.component.html',
  styleUrl: './link-list.component.scss'
})
export class LinkListComponent implements OnInit {

  private readonly linkService = inject(LinkService);
  private readonly modalService = inject(ModalService);
  private readonly confirmService = inject(ConfirmService);
  private readonly toastService = inject(ToastService);
  
  public linkList!: ILink[];

  public clipboard: string = '';

  public page: number = 0;

  public scroll!: any;

  public loaderPagination: boolean = false;
  public noMorePages: boolean = false;

  public dropdownData: IDropdownData<ILink> = {
    header: 'Link',
    button: {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>'
    },
    rows: [
      {
        title: 'Copy',
        fnc: (data: any) => {
          this.copyToClipboard(data.shortLink);
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
      },
      {
        title: 'Edit',
        fnc: async (data: any) => {
          (await this.modalService.open(UpdateShortlinkComponent, {
            ...data
          })).closed.subscribe(
            (res: any) => {
              if (!res) return;
              this.update(res);
            }
          );
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>'
      },
      {
        title: 'Remove',
        fnc: async (data: any) => {
          (await this.confirmService.open('Are you sure you want to delete this link?')).closed.subscribe(
            (res: boolean) => {
              if (!res) return;
              this.delete(data);
            }
          );
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'
      }
    ]
  }

  constructor() {
    effect(() => {
      this.linkList = this.linkService.linkList();
      window.onscroll = () => {
        this.scroll = window.scrollY;
      }
    });
  }
  
  ngOnInit(): void {}

  public copyToClipboard (clipboardString: string): void {
    navigator.clipboard.writeText(clipboardString).then(() => {
      this.clipboard = clipboardString;
      this.toastService.showToast('Copied to clipboard', 'success');
      setTimeout(() => {
        this.clipboard = '';
      }, 4000);
    });
  }

  public async loadMore (): Promise<void> {
    await this.getLinks(this.page + 1)
      .then(() => {
        this.page = this.page + 1;
      });
  }

  public async getLinks (page: number): Promise<void>  {
    this.loaderPagination = true;
    setTimeout(() => {
      this.linkService.getAll(page).subscribe(
        (res: ILink[]) => {
          this.loaderPagination = false;

          if (!res || res.length === 0) {
            this.noMorePages = true;
            return;
          } 

          this.linkService.linkList.set(this.linkService.linkList().concat(res));
        }
      )
    }, 500);
  }

  public delete (link: ILink): void {
    if (!link || !link.id) return;
    this.linkService.delete(link.id).subscribe(
      (res: any) => {
        if (!res) return;
        this.linkService.linkList.set(this.linkService.linkList().filter((l: ILink) => l.id !== link.id));
      }
    )
  }

  public update (link: ILink): void {
    if (!link) return;
    this.linkService.update(link).subscribe(
      (res: any) => {
        if (!res) return;
        this.linkService.linkList.set(this.linkService.linkList().map((l: ILink) => l.id === link.id ? link : l));
      }
    )
  }

  public scrollToTop (): void {
    window.scrollTo(0, 0);
  }

}
