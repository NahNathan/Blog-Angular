import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the menu bar and the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-menu-bar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should inject the Person structured data into the head', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    expect(JSON.parse(script!.textContent!)['@type']).toEqual('Person');
  });

  it('should set the document language according to the selected language', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(['pt-BR', 'en']).toContain(document.documentElement.lang);
  });
});
