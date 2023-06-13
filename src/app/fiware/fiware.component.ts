import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {ConfigServiceService} from '../config-service.service';

@Component({
  selector: 'app-fiware',
  templateUrl: './fiware.component.html',
  styleUrls: ['./fiware.component.css']
})
export class FiwareComponent implements OnInit {

  fiware:any;
  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/fiwares").subscribe(data=>{
      this.fiware = data
      this.spinner.hide();
    })
  }
}
