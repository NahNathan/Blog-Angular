import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechsSliderComponent } from './techs-slider.component';

describe('TechsSliderComponent', () => {
  let component: TechsSliderComponent;
  let fixture: ComponentFixture<TechsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechsSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
