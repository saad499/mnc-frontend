import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  missions:any;
  mnc_data: any;
  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/missions").subscribe(
      data=>{
      this.missions = data;
      this.service.get("/mnc-numbers").subscribe(data=>{
        this.mnc_data=data;
        this.spinner.hide();
      })
    })
    
  }

}
