import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { dataTechs } from '../../data/dataTechs';
import { dataTechs as dataTechsEn } from '../../data/dataTechsEn';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-techs-slider',
  templateUrl: './techs-slider.component.html',
  styleUrls: ['./techs-slider.component.css']
})
export class TechsSliderComponent implements OnInit, OnDestroy {
  techs = dataTechs;
  currentIndex = 0;
  private slideInterval: any;
  animationClass = '';
  language: string = 'pt';
  private languageSubscription?: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.language = this.languageService.getCurrentLanguage();
    this.loadData();
    this.startAutoSlide();
    
    this.languageSubscription = this.languageService.language$.subscribe(
      (lang) => {
        this.language = lang;
        this.loadData();
        // Reinicia o slider quando os dados mudam
        this.stopAutoSlide();
        this.currentIndex = 0;
        this.startAutoSlide();
      }
    );
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadData(): void {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.techs = currentLanguage === 'en' ? dataTechsEn : dataTechs;
  }

  nextSlide(): void {
    this.setAnimation('slide-out-left');
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.techs.length;
      this.setAnimation('slide-in-right');
    }, 300);
  }

  prevSlide(): void {
    this.setAnimation('slide-out-right');
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.techs.length) % this.techs.length;
      this.setAnimation('slide-in-left');
    }, 300);
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  setAnimation(animation: string): void {
    this.animationClass = animation;
    setTimeout(() => {
      this.animationClass = '';
    }, 300);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.stopAutoSlide();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.startAutoSlide();
  }
}
