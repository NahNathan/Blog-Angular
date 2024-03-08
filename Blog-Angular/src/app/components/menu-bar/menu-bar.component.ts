import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  showMessage = false; // Controla a visibilidade da mensagem

  copyEmailToClipboard(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão

    const email = 'nathanrodriguessantos3@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      this.showMessage = true; // Mostra a mensagem
      setTimeout(() => this.showMessage = false, 2000); // Esconde a mensagem após 2 segundos
    }).catch(err => {
      console.error('Erro ao copiar email para a área de transferência', err);
    });
  }
}
