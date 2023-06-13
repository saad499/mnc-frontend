import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ConfigServiceService } from '../config-service.service';
import { faCheckCircle,faSyncAlt } from '@fortawesome/free-solid-svg-icons'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery'

@Component({
  selector: 'app-adhesion',
  templateUrl: './adhesion.component.html',
  styleUrls: ['./adhesion.component.css']
})
export class AdhesionComponent implements OnInit,OnDestroy{
  title = 'newMat';
  isdone=false;
  showcaptcha=false;
  donne = faCheckCircle;
  isLinear = true;
  reficon=faSyncAlt
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup : FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  CaptchaFG : FormGroup;

  other:Boolean = false;
  items:Boolean []=  new Array(9);
  themes:String[] =['Entreprise Digitale','Big Data','Smart City','Smart Education','Multicanal',
            'Multimédia','Internet Of Things','Security & Cloud','Mobile']
  thematiques :String = '';
  montant :number =0;

  
  isSizeLargeOR: any;
  isSizeLargeCIN:any;
  isSizeLargeRC:any;

  // captchaaa=false; 
  siteKey:string;
  size:String;
  @ViewChild('Mycanvas', {static: false}) c: ElementRef;

  ctx :any;
  loadcap(): void {
    this.ctx = (this.c.nativeElement as HTMLCanvasElement).getContext("2d");
    this.resetCanvas()
  }
  numb = [1,2,3,4];
  constructor(private _formBuilder: FormBuilder, private service:ConfigServiceService,private spinner: NgxSpinnerService) {
    this.size="normal"
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
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
   var f1 = this.sixthFormGroup.get('ordre_de_Virement').value;
   var f2 = this.sixthFormGroup.get('registre_de_Commerce').value;
   var f3 = this.sixthFormGroup.get('cin').value;
    formData.append('files.order', f1);
    formData.append('files.registre', f2);
    formData.append('files.cin', f3);
    var data = {...this.firstFormGroup.value,...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,...this.fourthFormGroup.value,
      ...this.fifthFormGroup.value,
      "total": this.montant,
      "Date_de_demande":this.sixthFormGroup.value.date_de_demande,
      "Nom_organisme": this.sixthFormGroup.value.nom_organisme,
      "Represantant_Legal": this.sixthFormGroup.value.Represantant_Legal}
    formData.append("data",JSON.stringify(data));
    this.service.posth('/emailadhesion', formData,headers)
      .subscribe(res => {
        this.isdone=true;
        this.spinner.hide();
      })
  }

  getThematiques(){
    this.thematiques = ''
    for(var i=0 ; i<this.items.length ; i++ ){
      if(this.items[i] == true){
        this.thematiques = this.thematiques + ';' + this.themes[i]
      }
    }
    this.fourthFormGroup.patchValue({
      thematique: this.thematiques,
    });

  }
  ngOnInit() {
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
    window.scrollTo({top: 0, behavior: 'smooth'});
    for (var i = 0; i < this.items.length; i++) {
      this.items[i] = false;
   }
   this.firstFormGroup = this._formBuilder.group({
    Nom_Organisation:['', [Validators.minLength(3),Validators.required]],
    Nom_du_parrain: ['', [Validators.minLength(5),Validators.required]],
    organisation:['', [Validators.minLength(4),Validators.required]],
    fonction:['', [Validators.minLength(4),Validators.required]]
  });
  this.secondFormGroup = this._formBuilder.group({
    Nom_interlocuteur_principal: ['',[Validators.minLength(4),Validators.required]],
    fonction_interlocuteur_principal: ['', [Validators.minLength(4),Validators.required]],
    phone_interlocuteur_principal:['', [Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.required]],
    fax_interlocuteur_principal: ['', [Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.required]],
    email_interlocuteur_principal:['', [Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),Validators.required]],
    Nom_responsable_administratif: ['', [Validators.minLength(4),Validators.required]],
    fonction_responsable_administratif: ['', [Validators.minLength(4),Validators.required]],
    phone_responsable_administratif:['', [Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.required]],
    fax_responsable_administratif: ['', [Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.required]],
    email_responsable_administratif:['', [Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),Validators.required]],
    Nom_responsable_legal: ['', [Validators.minLength(4),Validators.required]],
    fonction_responsable_legal: ['', [Validators.minLength(4),Validators.required]],
    phone_responsable_legal:['', [Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.required]],
    fax_responsable_legal: ['', [Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.required]],
    email_responsable_legal:['', [Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),Validators.required]]
  });
  this.thirdFormGroup = this._formBuilder.group({
    autre: ['',Validators.maxLength(20)],
    type_Organisation: ['', Validators.required],
    adresse: ['',[Validators.minLength(5), Validators.required]],
    code_Postal: ['', [Validators.minLength(5),Validators.pattern("[0-9]*"),Validators.required]],
    ville: ['', [Validators.minLength(2),Validators.required]],
    lien_Web: ['', [Validators.minLength(5),Validators.required]],
    annee_de_Creation: ['', [Validators.minLength(3),Validators.pattern("[0-9]*"),Validators.required]],
    effectif: ['', [Validators.required,Validators.pattern("[0-9]*")]],
    Capital: ['', [Validators.pattern("[0-9]*"),Validators.required]],
    forme_juridique: ['', Validators.required],
    registre_de_commerce: ['', [Validators.minLength(3),Validators.required]],
    Numero_Patente: ['',[Validators.minLength(3), Validators.required]],
    identifiant_Fiscal: ['', [Validators.minLength(3),Validators.required]],
    activite: ['', [Validators.minLength(3),Validators.required]],
    autorisation: ['',[Validators.minLength(3),Validators.required]]
  });
  this.fourthFormGroup = this._formBuilder.group({
    thematique: ['', Validators.required],
    attente_vis_à_vis_de_MNC: ['',[Validators.minLength(5),Validators.maxLength(1000),Validators.required]] 
  });
  this.fifthFormGroup = this._formBuilder.group({
    cotisation: ['', [Validators.pattern("[0-9]*"),Validators.required]],
    cotisation_Soutien: ['',[Validators.pattern("[0-9]*"), Validators.required]],
    Avance: ['', [Validators.pattern("[0-9]*"),Validators.required]],
    avance_Soutien: ['', [Validators.pattern("[0-9]*"),Validators.required]],
    don_supplémentaire: ['', [Validators.pattern("[0-9]*"),Validators.required]]
    
  });
  this.sixthFormGroup = this._formBuilder.group({
    ordre_de_Virement:[null,Validators.required],
    registre_de_Commerce:[null,Validators.required],
    cin:[null,Validators.required],
    date_de_demande: ['', Validators.required],
    nom_organisme: ['', Validators.required],
    Represantant_Legal: ['', Validators.required]
  });
  this.CaptchaFG=this._formBuilder.group({
    captcha: ['', Validators.required]
  })
  }
  onChange(){
    this.other = this.thirdFormGroup.value.typeOrg === "Autre"
  }

  checkItem(i:number){
    this.items[i] = !this.items[i]
  }
  onChange2(){
    const cotis20:number = +this.fifthFormGroup.value.cotisation
    const cotisSoutien20:number = +this.fifthFormGroup.value.cotisation_Soutien
    const avance21:number = +this.fifthFormGroup.value.Avance
    const avanceSoutien21:number = +this.fifthFormGroup.value.avance_Soutien
    const don:number = +this.fifthFormGroup.value.don_supplémentaire

    this.montant = cotis20 + cotisSoutien20 + avance21 + avanceSoutien21 + don

  }

  onFileChange(event:any, controlName:any) {
    this.isSizeLargeOR = false;
    this.isSizeLargeCIN = false;
    this.isSizeLargeRC = false;

    if(event.target.files.length !== 0) {
      if(event.target.files[0].size <= 3048576){
        this.sixthFormGroup.controls[controlName].setValidators([])
        this.sixthFormGroup.patchValue({
          [controlName]: event.target.files[0],
        });
      }
      else{
        if(controlName == "ordreVirement"){
          this.isSizeLargeOR = true;

        } else if(controlName == "cin"){
          this.isSizeLargeCIN = true;

        }
        else if(controlName == "registreC"){
          this.isSizeLargeRC = true;

        }
       
      }
    }
  }
  show(s){
    
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
