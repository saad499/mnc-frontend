import { Component, Input, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() title: any = '';
  constructor() { }
 
  ngOnInit(): void {
  }

}
