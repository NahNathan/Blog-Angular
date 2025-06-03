import { Component, OnInit } from '@angular/core';
import { dataProjects } from '../../data/dataProjects';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = dataProjects;

  constructor() {}

  ngOnInit(): void {}
}
