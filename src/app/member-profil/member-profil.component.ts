import { Component, OnInit, ViewChild } from '@angular/core';
import { MemeberProfil } from '../models/memberprofil';
import { ConfigServiceService } from '../config-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { error } from 'console';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-member-profil',
  templateUrl: './member-profil.component.html',
  styleUrls: ['./member-profil.component.css']
})
export class MemberProfilComponent implements OnInit {

  memberProfil:any |undefined;
  currentobj:any;
  img = faImage;
  vd = faVideo;
  host = 'https://www.mncwebsite.com/'
  @ViewChild('video1') video1: ModalDirective;
  id:any;
  
  constructor(private service:ConfigServiceService, private router: Router, private sanitizer: DomSanitizer, private route:ActivatedRoute, private location :Location) { }

  sanitizeMarkDown(markdown: string):any{
    return this.sanitizer.bypassSecurityTrustHtml(markdown);
  }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.get('/member-profils?id='+this.id).subscribe( 
      data => {
        this.memberProfil = data['0'];
        
      });
  }

  showModel(data){
    this.currentobj=data
    this.location.go(this.genererurl(data))
    this.video1.show()
    console.log(this.video1)
    
    }

    shareurl(){
      return this.host+ this.genererurl(this.currentobj).replace('#','%23')
    }
  
  transform(url) {
      url=url.replace(".be", "be.com/embed");
      url=url.replace('/watch?v=', '/embed/')
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    genererurl(data){
      return 'media#'+data.name_fr.replace(/ /g,'_')+'/'+data.id*3201;
    }
    closemodal() {
      this.location.go('/media')
      this.video1.hide()
    }

}
