import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILink } from '../../../entitys/ILink';

@Component({
  selector: 'app-create-shortlink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-shortlink.component.html',
  styleUrl: './create-shortlink.component.scss'
})
export class CreateShortlinkComponent {
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<ILink>,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      link: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const response: ILink = {
      name: this.form.value.name,
      url: this.form.value.link,
    }

    this.dialogRef.close(this.form.value);
  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
