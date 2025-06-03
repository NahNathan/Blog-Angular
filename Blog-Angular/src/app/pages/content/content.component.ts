import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {dataProjects} from '../../data/dataProjects'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  photoCover:string=""
  contentTitle:string=""
  contentDescription=""
  contentLink=""
  private ide:string|null="0"
  constructor(
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
      this.route.paramMap.subscribe( value=>
        this.ide=value.get("Id")
      )
      this.setValuesToComponent(this.ide)
  }
  setValuesToComponent(id:string|null){
    const result = dataProjects.filter(article => article.Id== this.ide)[0]
    this.contentTitle = result.title
    this.contentDescription = result.description
    this.photoCover = result.photo
    this.contentLink= result.link
  }

}
