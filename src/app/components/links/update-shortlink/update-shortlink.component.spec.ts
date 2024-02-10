import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShortlinkComponent } from './update-shortlink.component';

describe('UpdateShortlinkComponent', () => {
  let component: UpdateShortlinkComponent;
  let fixture: ComponentFixture<UpdateShortlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateShortlinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateShortlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
