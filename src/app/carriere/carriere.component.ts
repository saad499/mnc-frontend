import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ConfigServiceService } from '../config-service.service';
import { faCheckCircle,faTimesCircle,faSyncAlt } from '@fortawesome/free-solid-svg-icons'; 
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery'
@Component({
  selector: 'app-carriere',
  templateUrl: './carriere.component.html',
  styleUrls: ['./carriere.component.css']
})
export class CarriereComponent implements OnInit,OnDestroy {
  siteKey:string;
  size:String;
  isdone=false;
  isnotdone=false;
  showcaptcha=false;
  reficon=faSyncAlt
  donne = faCheckCircle;
  ndonne =faTimesCircle;
  code;
  constructor(private _formBuilder : FormBuilder,private service:ConfigServiceService,private spinner: NgxSpinnerService) { 
    this.size="normal"
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  firstFormGroup : FormGroup;
  CaptchaFG : FormGroup;
  @ViewChild('Mycanvas', {static: false}) c: ElementRef;

  ctx :any;
  loadcap(): void {
    this.ctx = (this.c.nativeElement as HTMLCanvasElement).getContext("2d");
    this.resetCanvas()
  }
  numb = [1,2,3,4];
  ngOnInit(): void {

$("#submitcap").click(() =>{
  var numcheck = Number(this.CaptchaFG.get('captcha').value);
  console.log(numcheck)
  if(numcheck === (this.numb[0]*1000)+(this.numb[1]*100)+(this.numb[2]*10)+(this.numb[3])) {
    this.clear()
    this.submit()
  } else {
    this.clear()
    this.resetCanvas()
this.CaptchaFG.get('captcha').setValue('')
  };
});
    window.onbeforeunload = function (event) {
      event.preventDefault();
      event.returnValue = '';
   };
    this.firstFormGroup = this._formBuilder.group({
      email: ['',[Validators.required,Validators.email,Validators.maxLength(40),Validators.minLength(8)]],
      firstName: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(2)]],
      lastName: ['',[Validators.required,Validators.maxLength(20),Validators.minLength(2)]],
      civilite: ['',Validators.required],
      objet: ['', Validators.required],
      CV: [null,Validators.required],
      LM: [null,Validators.required]    });
this.CaptchaFG=this._formBuilder.group({
  captcha: ['', Validators.required]
})

}
  isSizeLargeCV : any;
  isSizeLargeLM :any;
  onFileChange(event:any, controlName:any) {
    this.isSizeLargeCV = false;
    this.isSizeLargeLM = false;
    if(event.target.files.length !== 0) {
      if(event.target.files[0].size <= 3048576){
        this.firstFormGroup.controls[controlName].setValidators([])
        this.firstFormGroup.patchValue({
          [controlName]: event.target.files[0],
        });
      }
      else{
        if(controlName == "CV"){
          this.isSizeLargeCV = true;
        } else if(controlName == "LM"){
          this.isSizeLargeLM = true;
        } 
      }
    }
  }
  
ngOnDestroy(){    
    window.onbeforeunload = null
}


submit(){
    window.onbeforeunload = null
    this.spinner.show();
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    var f1 = this.firstFormGroup.get('CV').value;
    var f2 = this.firstFormGroup.get('LM').value;
    formData.append('files.cv', f1);
    formData.append('files.lettre', f2);
    var data = {"Prenom":this.firstFormGroup.get('firstName').value,
    "Nom":this.firstFormGroup.get('lastName').value,
    "Civilité":this.firstFormGroup.get('civilite').value,
    "Email":this.firstFormGroup.get('email').value,
    "Objet":this.firstFormGroup.get('objet').value}
    formData.append("data",JSON.stringify(data));
    this.service.posth('/emailcareer', formData,headers)
      .subscribe(res => {
      this.isdone=true  
      this.spinner.hide();    
        },err=>{
this.isnotdone=false;
this.spinner.hide();    
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
  this.sets[0] = Math.random() * (80 - 10) + 10;
  this.sets[1] = Math.random() * (180 - 100) + 70;
  this.sets[2] = Math.random() * (280 - 200) + 140;
  this.sets[3] = Math.random() * (370 - 300) + 210;
};

 hei = [95,95,95,95];

 height() {
  this.hei[0] = Math.random() * (95 - 30) + 30;
  this.hei[1] = Math.random() * (95 - 30) + 30;
  this.hei[2] = Math.random() * (95 - 30) + 30;
  this.hei[3] = Math.random() * (95 - 30) + 30;
};

 captcha() {
  this.ctx.font = " italic 30px Arial";
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
