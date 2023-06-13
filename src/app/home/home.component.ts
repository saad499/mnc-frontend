import { Component, HostListener, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';
import * as $ from 'jquery'
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nbr=0;
  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService,private route: ActivatedRoute) { }
  public home_image:any
  public actualites:any;
  public events:any;
  public missions:any;
  public firstmis:any;
  public firstmisimage:any;
  nbractu:any;
 mnc_data:any
  ngOnInit(): void {
    this.spinner.show();
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.service.get("/accueil-actualites").subscribe(data=>{
      this.home_image=environment.host+data['image'].url;
      this.actualites=data['actualites'];
      this.nbractu=Object.keys(this.actualites).length
      this.events=data['evenements'];
      this.service.get("/missions").subscribe(data=>{
        this.missions =data;
        this.service.get("/mnc-numbers").subscribe(data=>{
          this.mnc_data=data;
          var id =this.route.snapshot.fragment
          if(id!=null)
          setTimeout(() => {
          $(document).ready(() => {
            $('html, body').animate({
              scrollTop: $('#'+id).offset().top
            }, 'slow');        
            })  }, 1000);
          this.spinner.hide();
        })
      })
    });
}
 animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

  genereurl(id){
    return (9000+id)*5;
}
@HostListener('window:scroll', ['$event']) 
  scroled(){
  if(this.nbr==0 && this.mnc_data!=undefined)
  $(document).ready(() => {
    var obj = document.getElementById("number1");
    this.animateValue(obj, 0, this.mnc_data['projets_accompagnes'], 2000);
     obj = document.getElementById("number2");
    this.animateValue(obj, 0, this.mnc_data['partenariats_internationaux'], 2000);
     obj = document.getElementById("number3");
    this.animateValue(obj, 0, this.mnc_data['membres'], 2000);
     obj = document.getElementById("number4");
    this.animateValue(obj, 0, this.mnc_data['evenements_realises'], 2000);
     obj = document.getElementById("number5");
    this.animateValue(obj, 0, this.mnc_data['millions_d_investissement_realises'], 2000);
    this.nbr++;
  })
}

}
