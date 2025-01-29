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

  ngOnInit(): void {
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.techs.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.techs.length) % this.techs.length;
  }

  startAutoSlide(): void {
    this.stopAutoSlide(); // Garante que não haja múltiplos intervalos ativos
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 15000);
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.stopAutoSlide();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.startAutoSlide();
  }
}
