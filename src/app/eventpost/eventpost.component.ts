import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-eventpost',
  templateUrl: './eventpost.component.html',
  styleUrls: ['./eventpost.component.css']
})
export class EventpostComponent implements OnInit {
icon=faCalendarAlt;
  constructor(  private route: ActivatedRoute,private service:ConfigServiceService,private spinner: NgxSpinnerService   ) { }
  id:any;
  event:any=false;
  ngOnInit(): void {
    this.spinner.show();
      this.id = this.route.snapshot.params['id'];
      this.id= this.genereid(this.id)
      this.event=this.service.get("/evenements?id="+this.id).subscribe(data=>{
        this.event = data['0'];
        this.spinner.hide();
        window.scrollTo({top: 0, behavior: 'smooth'});

      })
  }
  genereid(url){
    return (url/5)-9000;

  }

}
