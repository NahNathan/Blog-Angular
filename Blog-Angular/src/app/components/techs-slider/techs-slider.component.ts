import { Component, OnInit, HostListener } from '@angular/core';
import { dataTechs } from '../../data/dataTechs';

@Component({
  selector: 'app-techs-slider',
  templateUrl: './techs-slider.component.html',
  styleUrls: ['./techs-slider.component.css']
})
export class TechsSliderComponent implements OnInit {
  techs = dataTechs;
  currentIndex = 0;
  private slideInterval: any;
  animationClass = '';

  ngOnInit(): void {
    this.startAutoSlide();
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
    }, 9000);
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
