import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {ConfigServiceService} from '../config-service.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
  services: any;
  typeservices: any;
  constructor(private service: ConfigServiceService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.get('/type-services').subscribe(
      data => {
        this.typeservices = data;
        this.spinner.hide();
      });
  }
  dynamicurl(nom:string): string
  {
    var service = nom.replace(/ /g,"-");
    return service;
  }


}
