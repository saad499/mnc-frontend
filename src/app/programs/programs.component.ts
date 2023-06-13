import { Component, OnInit } from '@angular/core';
import {ConfigServiceService} from '../config-service.service';
import {faLevelDownAlt} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  icone=faLevelDownAlt;
  program:any;
  fp:any;
  fiware_components:any;
  fiware_sectors:any;
  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/programs").subscribe(data=>{
      this.program = data
      this.service.get("/fiware-programs").subscribe(data=>{
        this.fp = data
        this.service.get("/fiware-components").subscribe(data=>{
          this.fiware_components = data
          this.service.get("/fiware-sectors").subscribe(data=>{
            this.fiware_sectors = data
            this.spinner.hide();

          })
        })
      })
    })  
  }
}
