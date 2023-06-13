import { Component, OnInit } from '@angular/core';
import { faCalendarAlt, faSignInAlt,faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-presse',
  templateUrl: './presse.component.html',
  styleUrls: ['./presse.component.css']
})
export class PresseComponent implements OnInit {
  calendar = faCalendarAlt;
  sing = faSignInAlt;
  right = faChevronCircleRight;
  left = faChevronCircleLeft;
  constructor(private service: ConfigServiceService,private spinner: NgxSpinnerService) { 
   
  }
  events : any=false;
  nbrelements = 6;
  startNbr = 0 ;
  NbrPages : any; 
  numbers : any;
  currentpage = 0;
  hasprevious = false;
  hasnext = false;

  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/actualites?type=Communique_de_presse").subscribe(data=>{
      this.events = data;
      this.NbrPages = Object.keys(data).length / this.nbrelements;
      if(Object.keys(data).length % this.nbrelements != 0){
        this.NbrPages = Math.floor(this.NbrPages) + 1 ;
      }
      this.numbers = Array(this.NbrPages).fill(null).map((x,i)=>i);
      this.getDataForpage(0);
    })
    
  }
  topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  getDataForpage(start) {
    this.spinner.show();
    this.service.get("/actualites?type=Communique_de_presse&_sort=date:DESC&_start="+(start*this.nbrelements)+"&_limit="+this.nbrelements).subscribe(data=>{
      this.events = data;
      var activepage = document.getElementById("page"+start);
     activepage.classList.add("activee");
     for(var nbr of this.numbers){
   if(nbr!=this.currentpage){
    var inactivepage = document.getElementById("page"+nbr);
    inactivepage.classList.remove("activee");
   }
     }
     this.spinner.hide();
    })
    this.currentpage = start;
    if (start != 0 && start != this.NbrPages){

      this.hasprevious = true;
      this.hasnext = true;  
      }

    if(start == 0 ){
      this.hasprevious = false;
      if (this.NbrPages > 1){
        this.hasnext = true;
      }
    }
    if(start == this.NbrPages-1){
       this.hasnext = false;
     }
this.topFunction();     
  }
  genereurl(id){
      return (9000+id)*5;
  }
}