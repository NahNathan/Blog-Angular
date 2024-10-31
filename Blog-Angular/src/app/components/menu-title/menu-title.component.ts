import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu-title',
  templateUrl: './menu-title.component.html',
  styleUrls: ['./menu-title.component.css']
})
export class MenuTitleComponent implements OnInit, OnDestroy {
  private letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private interval: any;

  constructor() {}

  ngOnInit(): void {
    this.randomizeLetters(); // Chamada da função ao inicializar o componente
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  randomizeLetters(): void {
    const target = document.querySelector('h1[data-value="Bem Vindo!"]') as HTMLElement; // Seleciona o elemento diretamente
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
        target.innerText = originalText; // Restaura o texto original no fim
      }
    }, 50);
  }
}
