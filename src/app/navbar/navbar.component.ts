import { Component, OnInit } from '@angular/core';
import { faBars,faEnvelope,faPhone} from '@fortawesome/free-solid-svg-icons'; 
import { faFacebook,faTwitter,faYoutube,faLinkedin,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { ConfigServiceService } from '../config-service.service';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  mail = faEnvelope;
  phone = faPhone;
  fb = faFacebook;
  insta = faInstagram;
  twitter = faTwitter;
  youtube = faYoutube;
  linkdein = faLinkedin;
  contact:any;
  langg="../../assets/images/icones/fr.png";
  partenaires:any;
  searchvalue:any;
  input:string=null;
  constructor(private translateService:TranslateService,private titleService: Title,private router:Router,private service:ConfigServiceService) { 
  }

  ngOnInit(): void {
    $("#navbarResponsive").on('show.bs.collapse', function() {
      $('a.forcklick').click(function() {
          $("#navbarResponsive").collapse('hide');
      });
  });
  if(localStorage.getItem('lg')=='fr'){
    this.langg="../../assets/images/icones/fr.png";
      }
      if(localStorage.getItem('lg')=='en'){
        this.langg="../../assets/images/icones/en.png";
          }
          this.service.get("/partenaiires").subscribe(data=>{
            this.partenaires = data;
          })

          this.service.get("/contact-us").subscribe(data=>{
            this.contact = data;
          })
        }
  switchlang(lng){
  localStorage.setItem("lg",lng);
  this.translateService.use(lng);
  this.translateService.get("titre").subscribe(name=>{
    this.titleService.setTitle(name);
  });
  if(localStorage.getItem('lg')=='fr'){
    this.langg="../../assets/images/icones/fr.png";
      }
      if(localStorage.getItem('lg')=='en'){
        this.langg="../../assets/images/icones/en.png";
          }
}
genereurl(str){
  var url = str.replace(/ /g,'-');
  return url;
}
search(){
  var value = (<HTMLInputElement>document.getElementById("searchh")).value;
  (<HTMLInputElement>document.getElementById("searchh")).value="";
this.router.navigateByUrl("/search/"+value.replace(/ /g,"-"))
}

}
