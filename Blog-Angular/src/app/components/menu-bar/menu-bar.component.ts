import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit, OnDestroy {
  showMessage = false;
  language: string = 'pt';
  private languageSubscription?: Subscription;

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
    if (this.language === 'pt') {
      const link = document.createElement('a');
      link.href = 'assets/Curriculo.pdf';
      link.download = 'Curriculo_Nathan_Rodrigues.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (this.language === 'en') {
      const link = document.createElement('a');
      link.href = 'assets/Resume.pdf';
      link.download = 'Resume_Nathan_Rodrigues.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }    
  }
  showQRCodeModal = false;
  showQRCode(event: Event): void {
    event.preventDefault();
    this.showQRCodeModal = true;
  }

  closeQRCodeModal(): void {
    this.showQRCodeModal = false;
  }

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Obtém o idioma atual
    this.language = this.languageService.getCurrentLanguage();
    
    // Se inscreve para receber atualizações do idioma
    this.languageSubscription = this.languageService.language$.subscribe(
      (lang) => {
        this.language = lang;
      }
    );
  }

  ngOnDestroy(): void {
    // Limpa a inscrição quando o componente for destruído
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  changeToEnglish(event: Event): void {
    event.preventDefault();
    this.languageService.changeToEnglish();
  }

  changeToPortuguese(event: Event): void {
    event.preventDefault();
    this.languageService.changeToPortuguese();
  }
}
