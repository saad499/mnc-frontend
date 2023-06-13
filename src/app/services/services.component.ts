import { Component, OnInit } from '@angular/core';
import {ConfigServiceService} from '../config-service.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: any;
  typeservices: any;
   selectedIndex :number[]=[0];
id:any;
  constructor(private serv: ConfigServiceService,private route:ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.serv.get('/type-services').subscribe(
    data => {
  for(var d in data){
    this.selectedIndex.push(0);
  }
  this.typeservices = data;
  this.id=this.route.snapshot.fragment
  if(this.id!=undefined){
  var divid = this.id.split("/")[0];
  var divindex = this.id.split("/")[1];
  var tabindex = this.id.split("/")[3];
      $(document).ready(() => {
        $('html, body').animate({
            scrollTop: $('#'+divid).offset().top
        }, 'slow');
  this.selectedIndex[divindex]=tabindex;
    })
  }
  this.spinner.hide();

});

}
  decodeurl(url){
    return url.replace("-",/ /g);
  }
  dynamicurl(stri): string
  {
    var service = stri.replace(/ /g,"-");
    return service;
  }

}
