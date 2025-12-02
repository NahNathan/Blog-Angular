import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-text-card',
  templateUrl: './text-card.component.html',
  styleUrls: ['./text-card.component.css']
})
export class TextCardComponent {
  constructor(private languageService: LanguageService) {}

  language: string = 'pt';
  private languageSubscription?: Subscription;
  
  ngOnInit(): void {
      this.language = this.languageService.getCurrentLanguage();
      this.languageSubscription = this.languageService.language$.subscribe(
        (lang) => {
          this.language = lang;
        }
      );
    }
  
    ngOnDestroy(): void {
      if (this.languageSubscription) {
        this.languageSubscription.unsubscribe();
      }
    }
}
