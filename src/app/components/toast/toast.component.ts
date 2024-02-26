import { Component, OnInit, Inject, effect } from '@angular/core';
import { DATA_TOAST } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {

  public toastList!: any[];

  public height = `0px`

  constructor(
    @Inject(DATA_TOAST) public data: any
  ) {
    this.toastList = [];
    effect(() => {
      this.toastList = data();
      this.height = this.toastList.length * 60 + "px"
    })
  }

  ngOnInit(): void {
    
  }

}
