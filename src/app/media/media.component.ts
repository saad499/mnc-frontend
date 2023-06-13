  
import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery'
import {ConfigServiceService} from '../config-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import { faFacebook,faTwitter,faLinkedin,faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ModalDirective} from 'angular-bootstrap-md';
import { faImage,faVideo} from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  gallerie:any;
  value: any;
  currentobj:any;
  fb = faFacebook;
  twitter = faTwitter;
  linkdein = faLinkedin;
  wp = faWhatsapp;
  img=faImage;
  vd=faVideo;
  host='https://www.mncwebsite.com/'
  @ViewChild('video1') video1: ModalDirective;
  id:any
  constructor(private service:ConfigServiceService,private route: ActivatedRoute,private spinner: NgxSpinnerService,private sanitizer: DomSanitizer,private location: Location) {
  }

  ngOnInit(): void {
    $(document).ready(function(){
      $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        console.log(value)
        if(value == "all")
        {
          $('.filter').show('1000');
        }
        else
        {
          $(".filter").not('.'+value).hide('3000');
          $('.filter').filter('.'+value).show('3000');
        }
      });

      if ($(".filter-button").removeClass("activee")) {
        $(this).removeClass("activee");
      }
      $(this).addClass("activee");
    });
  this.spinner.show();
    this.service.get("/media-files").subscribe(
      data=>{
       this.gallerie = data;
        this.id=this.route.snapshot.fragment
        if(this.id!=undefined){
      var fg=parseInt(this.id.split('/')[1])/3201
      for(var d of this.gallerie){
        if(d.id==fg) {
          this.currentobj=d;
          this.video1.show()
          }
        }
        }
   this.spinner.hide();
      })
  }
  showModel(data){
this.currentobj=data
this.location.go(this.genererurl(data))
this.video1.show()
console.log(this.video1)

  }
  shareurl(){
    return this.host+ this.genererurl(this.currentobj).replace('#','%23')
  }
  transform(url) {
    url=url.replace(".be", "be.com/embed");
    url=url.replace('/watch?v=', '/embed/')
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  genererurl(data){
    return 'media#'+data.name_fr.replace(/ /g,'_')+'/'+data.id*3201;
  }
  closemodal() {
    this.location.go('/media')
    this.video1.hide()
  }
}

