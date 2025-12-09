import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://nahnathan.github.io/Blog-Angular';
  private defaultImage = 'https://nahnathan.github.io/Blog-Angular/assets/qrcode.png';
  private defaultTitle = 'Nathan 『RdS』';
  private defaultDescription = 'Portfólio profissional de Nathan Rodrigues dos Santos, desenvolvedor web especializado em Angular, React, Java e Kotlin. Conheça meus projetos, tecnologias e experiência em desenvolvimento de software.';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateSeoData(data: SeoData): void {
    const title = data.title || this.defaultTitle;
    const description = data.description || this.defaultDescription;
    const image = data.image || this.defaultImage;
    const url = data.url || this.baseUrl;
    const type = data.type || 'website';
    const keywords = data.keywords || 'Nathan Rodrigues, desenvolvedor web, Angular, React, Java, Kotlin, portfólio, programador, desenvolvimento de software';

    // Update title
    this.title.setTitle(title);

    // Update or create primary meta tags
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });

    // Update Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:url', content: url });

    // Update canonical URL
    this.updateCanonicalUrl(url);
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setDefaultSeo(): void {
    this.updateSeoData({});
  }
}

