import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
projects:any;
  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/projets").subscribe(data=>{
      this.projects = data
      this.spinner.hide();

    })
  }

}
