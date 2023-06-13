import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from '../config-service.service';
import { faLevelDownAlt} from '@fortawesome/free-solid-svg-icons'; 
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-whyjoinus',
  templateUrl: './whyjoinus.component.html',
  styleUrls: ['./whyjoinus.component.css']
})
export class WhyjoinusComponent implements OnInit {
icone=faLevelDownAlt;
  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService) { }
  donnees:any;
  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/pourquoi-nous-rejoindres").subscribe(data =>{
      this.donnees = data;
      this.spinner.hide();
        })
  }

}
