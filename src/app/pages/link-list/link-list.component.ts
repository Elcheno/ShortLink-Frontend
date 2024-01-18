import { Component, OnInit, effect, inject } from '@angular/core';
import { Link } from '../../entitys/Link';
import { LinkService } from '../../services/link/link.service';
import { AuthService } from '../../services/auth/auth.service';
import { DataViewModule } from 'primeng/dataview';


@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [DataViewModule],
  templateUrl: './link-list.component.html',
  styleUrl: './link-list.component.scss'
})
export class LinkListComponent implements OnInit {

  private linkService = inject(LinkService);
  private authService = inject(AuthService);
  
  public linkList: Link[];

  constructor() {
    this.linkList = [];
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

}
