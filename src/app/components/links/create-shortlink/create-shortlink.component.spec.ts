import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortlinkComponent } from './create-shortlink.component';

describe('CreateShortlinkComponent', () => {
  let component: CreateShortlinkComponent;
  let fixture: ComponentFixture<CreateShortlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShortlinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateShortlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
