import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-menu-title',
  templateUrl: './menu-title.component.html',
  styleUrls: ['./menu-title.component.css']
})
export class MenuTitleComponent implements OnInit, OnDestroy {
  private letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private interval: any;

  constructor(private languageService: LanguageService) {}

  language: string = 'pt';
  private languageSubscription?: Subscription;  

  ngOnInit(): void {
    this.language = this.languageService.getCurrentLanguage();
    this.languageSubscription = this.languageService.language$.subscribe(
      (lang) => {
        if (this.interval)
          clearInterval(this.interval);

        this.language = lang;
        setTimeout(() => {
          this.randomizeLetters();
        }, 100);
      }
    );

    setTimeout(() => {
      this.randomizeLetters();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  randomizeLetters(): void {
    const textToAnimate = this.language === 'pt' ? 'Bem Vindo!' : 'Welcome!';
    const target = document.querySelector(`h1[data-value="${textToAnimate}"]`) as HTMLElement;
    
    if (!target) {
      return;
    }

    const originalText = target.getAttribute('data-value')!;
    let iteration = 0;

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      target.innerText = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return this.letters[Math.floor(Math.random() * 26)];
        })
        .join('');

      iteration += 1 / 3;

      if (iteration >= originalText.length) {
        clearInterval(this.interval);
        target.innerText = originalText;
      }
    }, 50);
  }
}
