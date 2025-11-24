import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  showMessage = false;

  copyEmailToClipboard(event: Event) {
    event.preventDefault();

    const email = 'nathanrodriguessantos3@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 2000);
    }).catch(err => {
      console.error('Erro ao copiar email para a área de transferência', err);
    });
  }

  downloadCV(event: Event): void {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = 'assets/Curriculo.pdf';
    link.download = 'Curriculo_Nathan_Rodrigues.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showQRCodeModal = false;
  showQRCode(event: Event): void {
    event.preventDefault();
    this.showQRCodeModal = true;
  }

  closeQRCodeModal(): void {
    this.showQRCodeModal = false;
  }

}
