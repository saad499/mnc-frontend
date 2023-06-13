import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { faMapMarkerAlt,faEnvelope,faPhone,faCheckCircle,faTimesCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons'; 
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faEnv = faEnvelope;
  faPh = faPhone;
  map = faMapMarkerAlt;
  donne = faCheckCircle;
  ndonne =faTimesCircle;
  reficon=faSyncAlt;
  year:any;
  actu:any;
  contact:any;
  siteKey:string;
  size:String;
  captchaaa=false;
  done=false;
  notdone=false;
  NewsForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  captchaform = new FormGroup({
    captcha: new FormControl('', Validators.required)
  });
  @ViewChild('Mycanvas', {static: false}) c: ElementRef;
  ctx :any;

  loadcap(): void {
    this.ctx = (this.c.nativeElement as HTMLCanvasElement).getContext("2d");
    this.resetCanvas()
  }
  constructor(private service:ConfigServiceService) { 
    this.siteKey=environment.captchakey
    if(window.screen.width>=992){
      this.size="compact"
    }else{
      this.size="normal"
    }
  }

  numb = [1,2,3,4];




  ngOnInit(): void {

$("#submitcap").click(() =>{
  var numcheck = Number(this.captchaform.get('captcha').value);
  console.log(numcheck)
  if(numcheck === (this.numb[0]*1000)+(this.numb[1]*100)+(this.numb[2]*10)+(this.numb[3])) {
    this.clear()
    this.addtonewsletter()
    this.captchaaa=false;

  } else {
    this.clear()
    this.resetCanvas()
this.captchaform.get('captcha').setValue('')

  };
});
    let dateTime = new Date()
    this.year=dateTime.getFullYear();
    this.service.get("/footer-actualites").subscribe(data=>{
      this.actu=data;
    });

    this.service.get("/contact-us").subscribe(data=>{
      this.contact = data;
    })

  }




  topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  todivFunc(id){
    $(document).ready(() => {
      $('html, body').animate({
          scrollTop: $('#'+id).offset().top
      }, 'slow');
  });
}
genererurl(id){
return (9000+id)*5;
}

addtonewsletter(){
  var data = this.NewsForm.value;
  var lnng = localStorage.getItem('lg');
  this.service.get("/emaillistes?email="+data['email']).subscribe(res=>{
if(res['length']==0){
  this.service.post("/emaillistes/"+lnng,data).subscribe(res=>{
  
    this.done=true;
  },err=>{    
    this.notdone=true;
  }
  )
} 
else{
    this.notdone=true;
} 

})

}

num() {
  this.numb[0] = Math.floor(Math.random()*10);
  this.numb[1] = Math.floor(Math.random()*10);
  this.numb[2] = Math.floor(Math.random()*10);
  this.numb[3] = Math.floor(Math.random()*10);
};

 sets = [80,180,280,380];

 sts() {
  // this.sets[0] = Math.random() * (80 - 10) ;
  // this.sets[1] = Math.random() * (180 - 100) + 60;
  // this.sets[2] = Math.random() * (280 - 200) + 120;
  // this.sets[3] = Math.random() * (370 - 300) + 180;
  this.sets = [10,50,100,140];

};

 hei = [95,95,95,95];

 height() {
  // this.hei[0] = Math.random() * (95 - 60) ;
  // this.hei[1] = Math.random() * (95 - 60);
  // this.hei[2] = Math.random() * (95 - 60);
  // this.hei[3] = Math.random() * (95 - 60);
  this.hei = [30,30,30,30];

};

 captcha() {
  this.ctx.font = " italic 20px Arial";
  this.ctx.fillStyle = "#000";
  this.ctx.fillText(String(this.numb[0]),this.sets[0],this.hei[0]);
  this.ctx.fillText(String(this.numb[1]),this.sets[1],this.hei[1]);
  this.ctx.fillText(String(this.numb[2]),this.sets[2],this.hei[2]);
  this.ctx.fillText(String(this.numb[3]),this.sets[3],this.hei[3]);
};

 design() {
  this.ctx.fillText("|",this.sets[0]+10,this.hei[0]);
  this.ctx.fillText("|",this.sets[1]+10,this.hei[1]);
  this.ctx.fillText("|",this.sets[2]+10,this.hei[2]);
  this.ctx.fillText("|",this.sets[3]+10,this.hei[3]);
  this.ctx.strokeStyle = "#000";
  this.ctx.lineWidth = 1;
  this.ctx.beginPath();
  this.ctx.moveTo(this.sets[0], this.hei[0]-15);
  this.ctx.lineTo(this.sets[1]+10, this.hei[1]-15);
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.beginPath();
  this.ctx.moveTo(this.sets[1]+10, this.hei[1]-15);
  this.ctx.lineTo(this.sets[2]+10, this.hei[2]-15);
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.beginPath();
  this.ctx.moveTo(this.sets[2]+10, this.hei[2]-15);
  this.ctx.lineTo(this.sets[3]+25, this.hei[3]-15);
  this.ctx.stroke();
  this.ctx.closePath();
};

 resetCanvas() { 
  this.num();
  this.height();
  this.sts();
  this.captcha();
  this.design();
};

 clear() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  $("#input").val("");
};


}

