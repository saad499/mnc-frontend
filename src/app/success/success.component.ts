import { Component, OnInit } from '@angular/core';
import { faPowerOff,faBatteryHalf,faMicrophone,faFingerprint} from '@fortawesome/free-solid-svg-icons'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  icon1=faPowerOff;
  icon2=faBatteryHalf;
  icon3=faMicrophone;
  icon4=faFingerprint;

  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService) { }
  lines:any;
  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/definition-de-la-reussite").subscribe(data=>{
      this.lines = data;
      this.spinner.hide();
    })
  }

}
