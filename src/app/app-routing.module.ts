import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdhesionComponent } from './adhesion/adhesion.component';
import { BlogComponent } from './blog/blog.component';
import { CarriereComponent } from './carriere/carriere.component';
import { CotisationComponent } from './cotisation/cotisation.component';
import { EventpostComponent } from './eventpost/eventpost.component';
import { EventsComponent } from './events/events.component';
import { FiwareComponent } from './fiware/fiware.component';
import { HomeComponent } from './home/home.component';
import { MediaComponent } from './media/media.component';
import { MissionsComponent } from './missions/missions.component';
import { NewspostComponent } from './newspost/newspost.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { PresseComponent } from './presse/presse.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProjectsComponent } from './projects/projects.component';
import { SearchComponent } from './search/search.component';
import { ServicesComponent } from './services/services.component';
import { SuccessComponent } from './success/success.component';
import { TeamComponent } from './team/team.component';
import { TestComponent } from './test/test.component';
import { WhyjoinusComponent } from './whyjoinus/whyjoinus.component';
import { MemberProfilComponent } from './member-profil/member-profil.component';


const routes: Routes = [
  {path: "",component:HomeComponent},
  {path: "missions",component:MissionsComponent},  
  {path: "our-deffinition-of-success",component:SuccessComponent},
  {path: "our-team",component:TeamComponent},
  {path: "our-projects",component:ProjectsComponent},
  {path: "why-join-us",component:WhyjoinusComponent},
  {path: "contribution",component:CotisationComponent},
  {path: "partners",component:PartenairesComponent},
  {path: "test",component:TestComponent},
  {path: "services",component:ServicesComponent},
  {path: "events",component:EventsComponent},
  {path: "event/:id",component:EventpostComponent},
  {path: "press",component:PresseComponent},
  {path: "blog",component:BlogComponent},
  {path: "news/:id",component:NewspostComponent},
  {path: "our-services",component:ServicesComponent},
  {path: "our-organization",component:OrganisationComponent},
  {path: "search/:id",component:SearchComponent},
  {path: "fiware",component:FiwareComponent},
  {path: "our-programs",component:ProgramsComponent},
  {path: "adhesion",component:AdhesionComponent},
  {path: "career",component:CarriereComponent},
  {path: "media",component:MediaComponent},
  {path: "memberProfil/:id",component:MemberProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
