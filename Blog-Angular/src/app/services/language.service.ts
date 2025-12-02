import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('pt');
  public language$: Observable<string> = this.languageSubject.asObservable();

  constructor() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.languageSubject.next(savedLanguage);
    }
  }

  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }

  setLanguage(language: 'pt' | 'en'): void {
    this.languageSubject.next(language);
    localStorage.setItem('language', language);
  }

  changeToEnglish(): void {
    this.setLanguage('en');
  }

  changeToPortuguese(): void {
    this.setLanguage('pt');
  }
}

