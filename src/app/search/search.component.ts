import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigServiceService } from '../config-service.service';
import { faCalendarAlt, faSignInAlt,faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  calendar = faCalendarAlt;
  sing = faSignInAlt;
  right = faChevronCircleRight;
  left = faChevronCircleLeft;
  constructor(private service:ConfigServiceService,private route:ActivatedRoute,private spinner: NgxSpinnerService) { }
  searchval:string;
  events : any=false;
  nbrelements = 6;
  startNbr = 0 ;
  NbrPages : any; 
  numbers : any;
  currentpage = 0;
  hasprevious = false;
  hasnext = false;
  dataforpage=[];
  lng:any;
  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params)=>{
      this.hasprevious = false;
      this.hasnext = false;
      this.lng= localStorage.getItem('lg')
      this.searchval=params?.id;
      this.searchval = this.searchval.split('-').join(' ');
     if(this.lng=='fr'){
      this.service.get("/actualites?_where[_or][0][titre_fr_contains]="+this.searchval+"&_where[_or][1][post_fr_contains]="+this.searchval).subscribe(data=>{
        this.events = data;
        this.service.get("/evenements?_where[_or][0][titre_fr_contains]="+this.searchval+"&_where[_or][1][post_fr_contains]="+this.searchval).subscribe(d=>{
          this.events = this.events.concat(d);
          this.NbrPages = Object.keys(this.events).length / this.nbrelements;
         if(Object.keys(this.events).length % this.nbrelements != 0){
              this.NbrPages = Math.floor(this.NbrPages) + 1 ;
                  }
           this.numbers = Array(this.NbrPages).fill(null).map((x,i)=>i);
               this.getDataForpage(0);
        })
      
      })
     }
     if(this.lng=='en'){
      this.service.get("/actualites?_where[_or][0][titre_en_contains]="+this.searchval+"&_where[_or][1][post_en_contains]="+this.searchval).subscribe(data=>{
        this.events = data;
        this.service.get("/evenements?_where[_or][0][titre_en_contains]="+this.searchval+"&_where[_or][1][post_en_contains]="+this.searchval).subscribe(d=>{
          this.events = this.events.concat(d);
          this.NbrPages = Object.keys(this.events).length / this.nbrelements;
         if(Object.keys(this.events).length % this.nbrelements != 0){
              this.NbrPages = Math.floor(this.NbrPages) + 1 ;
                  }
           this.numbers = Array(this.NbrPages).fill(null).map((x,i)=>i);
          this.getDataForpage(0);
        })
      
      })
     }
    })
  }
  
  getDataForpage(start) {
    this.spinner.show();
    this.dataforpage=[]
    for (var i=start*this.nbrelements; i<((start+1)*this.nbrelements) && i<Object.keys(this.events).length;i++){
      this.dataforpage.push(this.events[i]);
    }
    this.currentpage = start;
    var activepage = document.getElementById("page"+start);
    activepage?.classList.add("activee");
    for(var nbr of this.numbers){
    if(nbr!=this.currentpage){
    var inactivepage = document.getElementById("page"+nbr);
    inactivepage?.classList.remove("activee");
    }
     }
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
     setTimeout(() => {
      this.spinner.hide();
    }, 1200);     
    window.scrollTo({top: 0, behavior: 'smooth'});
     
  }
  genereurl(id,type){
      var randid= (9000+id)*5;
      if(type==undefined){
        return '/event/'+randid;
      } 
      else{
        return '/news/'+randid;

      }
  }

}
