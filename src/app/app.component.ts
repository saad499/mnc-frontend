import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { faCaretSquareUp} from '@fortawesome/free-solid-svg-icons'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ="mnc";
  mylang:string=null;
  mybutton:any;
  icon=faCaretSquareUp;
  constructor(private translateService:TranslateService,private titleService: Title){
    this.translateService.addLangs(['en','fr']);
    this.mylang=localStorage.getItem("lg");
    if(this.mylang==null){
      localStorage.setItem('lg','fr');
      this.translateService.setDefaultLang('fr');
    }
    else
    this.translateService.setDefaultLang(this.mylang);


    this.translateService.get("titre").subscribe(name=>{
      this.titleService.setTitle(name);
    });
  }
  ngOnInit(){
  
    AOS.init();
    this.mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {this.scrollFunction()};

    }
     scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.mybutton.style.display = "block";
      } else {
        this.mybutton.style.display = "none";
      }
    }
    
    // When the user clicks on the button, scroll to the top of the document
     topFunction() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
}
