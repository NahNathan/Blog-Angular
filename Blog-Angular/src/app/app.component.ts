import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Blog-Angular';
  private languageSubscription?: Subscription;

  constructor(
    private seoService: SeoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.seoService.setDefaultSeo();
    this.injectStructuredData();
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => this.seoService.updateLanguage(language)
    );
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  private injectStructuredData(): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Nathan Rodrigues dos Santos',
      'alternateName': 'Nathan『RdS』',
      'url': 'https://nathanrds.com.br/',
      'image': 'https://nathanrds.com.br/assets/qrcode.png',
      'jobTitle': ['Engenheiro de Integrações', 'Desenvolvedor Web'],
      'worksFor': {
        '@type': 'Organization',
        'name': 'MindCloud',
        'url': 'https://mindcloud.co/'
      },
      'alumniOf': {
        '@type': 'CollegeOrUniversity',
        'name': 'IFTM - Instituto Federal do Triângulo Mineiro'
      },
      'knowsAbout': [
        'Angular',
        'React',
        'Java',
        'Kotlin',
        'TypeScript',
        'JavaScript',
        'Desenvolvimento Web',
        'Frontend',
        'Backend',
        'Full Stack Development'
      ],
      'sameAs': [
        'https://github.com/NahNathan',
        'https://www.linkedin.com/in/nathan-rodrigues-dos-santos-422001147/'
      ],
      'description': 'Desenvolvedor web especializado em Angular, React, Java e Kotlin. Portfólio profissional com projetos e experiência em desenvolvimento de software.'
    };

    let script: HTMLScriptElement | null = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(structuredData);
  }
}
