import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigServiceService } from '../config-service.service';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})

export class PartenairesComponent implements OnInit {
  ps:any;
  id:any;
  i=0;
  constructor(private service:ConfigServiceService, private route: ActivatedRoute,private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  this.spinner.show();
    this.service.get("/partenaiires").subscribe(data =>{
    this.ps=data; 
    this.id=this.route.snapshot.fragment
     if(this.id!=null){
      $(document).ready(() => {
        setTimeout(() => {
        $('html, body').animate({
          scrollTop: $('#'+this.id).offset().top-50
        }, 'slow');        
        $('#'+this.id).css("background-color",'rgba(211, 242, 255, 0.15)');
        this.spinner.hide();

        setTimeout(() => {
          $('#'+this.id).css("background-color",'#fff');
        }, 2200);

      }, 1000);
        
        
        })
     }else{
      this.spinner.hide();
      window.scrollTo({top: 0, behavior: 'smooth'});
     }
    });
    this.i=0;
}


  genereurl(str){
    var url = str.replace(/ /g,'-');
    return url;
  }
}
