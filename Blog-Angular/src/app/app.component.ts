import { Component, OnInit } from '@angular/core';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Blog-Angular';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setDefaultSeo();
    this.injectStructuredData();
  }

  private injectStructuredData(): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Nathan Rodrigues dos Santos',
      'alternateName': 'Nathan『RdS』',
      'url': 'https://nathanrds.com.br/',
      'image': 'https://nathanrds.com.br/assets/qrcode.png',
      'jobTitle': 'Desenvolvedor Web',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Codesquare'
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
        'https://github.com/NahNathan'
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
