import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(LanguageService.detectInitialLanguage());
  public language$: Observable<string> = this.languageSubject.asObservable();

  private static detectInitialLanguage(): 'pt' | 'en' {
    const saved = localStorage.getItem('language');
    if (saved === 'pt' || saved === 'en') {
      return saved;
    }
    return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
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

