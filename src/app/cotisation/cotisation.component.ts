import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.css']
})
export class CotisationComponent implements OnInit {

  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService) { }
  content:any;
  cotisation:any
  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/page-cotisation").subscribe(data=>{
      this.content =data;
      this.service.get("/bareme-des-cotisations").subscribe(data=>{
        this.cotisation =data;
        this.spinner.hide();
      })
        })
    
  }

}
