import { Injectable, inject } from '@angular/core';
import { Dialog, type DialogRef } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private readonly dialog = inject(Dialog);

  private dialogRef!: DialogRef<any, ConfirmModalComponent> | null;
  
  public async open (msg?: string): Promise<DialogRef<any, ConfirmModalComponent>> {
    return await new Promise((resolve, _reject) => {
      this.dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '100vw',
        data: msg
      });
      resolve(this.dialogRef);
    });
  }

  public async close (): Promise<void> {
    await new Promise<void>((resolve, _reject) => {
      this.dialogRef?.close();
      this.dialogRef = null;
      resolve();
    });
  }
}
