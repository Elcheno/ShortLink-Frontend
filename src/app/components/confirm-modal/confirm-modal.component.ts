import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

  constructor (
    public dialogRef: DialogRef<boolean>,
    @Inject(DIALOG_DATA) public msg: string
  ) { }

  public closeModal(): void {
    this.dialogRef.close(false);
  }

  public confirmModal (): void {
    this.dialogRef.close(true);
  }

}
