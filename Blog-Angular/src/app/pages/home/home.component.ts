import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { dataProjects } from '../../data/dataProjects';
import { dataProjects as dataProjectsEn } from '../../data/dataProjectsEn';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  data = dataProjects;
  projectGroups: any[][] = [];
  private languageSubscription?: Subscription;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.loadData();
    this.projectGroups = this.getProjectGroups();
    
    this.languageSubscription = this.languageService.language$.subscribe(
      (lang) => {
        this.loadData();
        this.projectGroups = this.getProjectGroups();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadData(): void {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.data = currentLanguage === 'en' ? dataProjectsEn : dataProjects;
  }

  // Método para truncar a descrição
  truncateDescription(description: string, maxLength: number = 150): string {
    if (!description) return '';
    
    if (description.length <= maxLength) {
      return description;
    }
    
    // Encontra o último espaço antes do limite para não cortar palavras
    const truncated = description.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    return lastSpaceIndex > 0 
      ? truncated.substring(0, lastSpaceIndex) + '...'
      : truncated + '...';
  }

  // Método para dividir o array em grupos de 4 (1 big card + 3 small cards)
  private getProjectGroups(): any[][] {
    const groups = [];
    for (let i = 0; i < this.data.length; i += 4) {
      groups.push(this.data.slice(i, i + 4));
    }
    return groups;
  }
}