import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILink } from '../../../entitys/ILink';

@Component({
  selector: 'app-update-shortlink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-shortlink.component.html',
  styleUrl: './update-shortlink.component.scss'
})
export class UpdateShortlinkComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<ILink>,
    @Inject(DIALOG_DATA) public data: ILink
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      url: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.setValue({
        name: this.data.name,
        url: this.data.url
      });
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const response: ILink = {
      id: this.data.id,
      name: this.form.value.name,
      url: this.form.value.url,
    }

    this.dialogRef.close(response);
  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
