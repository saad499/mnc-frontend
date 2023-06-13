import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';
@Component({
  selector: 'app-newspost',
  templateUrl: './newspost.component.html',
  styleUrls: ['./newspost.component.css']
})
export class NewspostComponent implements OnInit {
  id:any;
  event:any=false;
  icon=faCalendarAlt;
  constructor(  private route: ActivatedRoute,private service:ConfigServiceService,private router:Router,private spinner: NgxSpinnerService ) {
    this.spinner.show();
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.id = this.route.snapshot.params['id'];
        this.id= this.genereid(this.id)
        this.event=this.service.get("/actualites?id="+this.id).subscribe(data=>{
          this.event = data['0'];
          this.spinner.hide();
          window.scrollTo({top: 0, behavior: 'smooth'});
        })
      }
    });
    
   }

  ngOnInit(): void {
    
  }
  genereid(url){
    return (url/5)-9000;

  }

}
