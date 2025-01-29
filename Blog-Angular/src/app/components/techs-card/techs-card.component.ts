import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-techs-card',
  templateUrl: 'techs-card.component.html',
  styleUrls: ['techs-card.component.css']
})
export class TechsCardComponent implements OnInit {

  @Input()
  techTitle:string = ""
  @Input()
  techPhoto:string = ""
  @Input()
  techDescription:string = ""

  ngOnInit(): void {
      
  }
}
