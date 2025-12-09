import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { dataProjects } from '../../data/dataProjects';
import { dataProjects as dataProjectsEn } from '../../data/dataProjectsEn';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
  photoCover:string=""
  contentTitle:string=""
  contentDescription=""
  contentLink=""
  language: string = 'pt';
  private ide:string|null="0"
  private languageSubscription?: Subscription;

  constructor(
    private route:ActivatedRoute,
    private languageService: LanguageService,
    private seoService: SeoService
  ){}
  
  ngOnInit(): void {
    this.language = this.languageService.getCurrentLanguage();
    this.route.paramMap.subscribe( value=> {
      this.ide=value.get("Id");
      this.setValuesToComponent(this.ide);
      this.updateSeo();
    });
    
    this.languageSubscription = this.languageService.language$.subscribe(
      (lang) => {
        this.language = lang;
        this.setValuesToComponent(this.ide);
        this.updateSeo();
      }
    );
  }

  private updateSeo(): void {
    if (!this.contentTitle) return;
    
    const description = this.contentDescription.length > 160 
      ? this.contentDescription.substring(0, 157) + '...'
      : this.contentDescription;
    
    this.seoService.updateSeoData({
      description: description,
      image: this.photoCover || undefined,
      url: `https://nahnathan.github.io/Blog-Angular/content/${this.ide}`,
      type: 'article',
      keywords: `${this.contentTitle}, projeto, desenvolvimento, ${this.language === 'en' ? 'web development' : 'desenvolvimento web'}`
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  setValuesToComponent(id:string|null){
    const currentLanguage = this.languageService.getCurrentLanguage();
    const data = currentLanguage === 'en' ? dataProjectsEn : dataProjects;
    const result = data.filter(article => article.Id== this.ide)[0]
    if (result) {
      this.contentTitle = result.title
      this.contentDescription = result.description
      this.photoCover = result.photo
      this.contentLink= result.link
    }
  }

}
