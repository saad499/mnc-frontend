import { Component, OnInit } from '@angular/core';
import { faLinkedin} from '@fortawesome/free-brands-svg-icons'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigServiceService } from '../config-service.service';
import { MemeberProfil } from '../models/memberprofil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
icone =faLinkedin;
team:any;

memberProfil:any;
  constructor(private service:ConfigServiceService,private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.get("/equipe-membres").subscribe(data=>{
      this.team=data;
      this.spinner.hide();
    })
    this.getMemberProfil();
  }

  private getMemberProfil(){
    this.service.get("/member-profils").subscribe(data => {
        console.log(data);
        this.memberProfil = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMemberProfilById(id:number){
    this.router.navigate(['memberProfil',id]);
  }

}
