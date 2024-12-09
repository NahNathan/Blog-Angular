import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STextCardComponent } from './s-text-card.component';

describe('STextCardComponent', () => {
  let component: STextCardComponent;
  let fixture: ComponentFixture<STextCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ STextCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(STextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
