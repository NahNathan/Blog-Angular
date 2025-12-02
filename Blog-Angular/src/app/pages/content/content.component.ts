import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { dataProjects } from '../../data/dataProjects';
import { dataProjects as dataProjectsEn } from '../../data/dataProjectsEn';
import { LanguageService } from '../../services/language.service';

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
  private ide:string|null="0"
  private languageSubscription?: Subscription;

  constructor(
    private route:ActivatedRoute,
    private languageService: LanguageService
  ){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe( value=>
      this.ide=value.get("Id")
    )
    this.setValuesToComponent(this.ide);
    
    this.languageSubscription = this.languageService.language$.subscribe(
      () => {
        this.setValuesToComponent(this.ide);
      }
    );
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
    this.contentTitle = result.title
    this.contentDescription = result.description
    this.photoCover = result.photo
    this.contentLink= result.link
  }

}
