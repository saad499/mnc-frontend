import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient,HttpClientModule } from "@angular/common/http";
import { TitleComponent } from './title/title.component';
import { FooterComponent } from './footer/footer.component'
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { MissionsComponent } from './missions/missions.component';
import { TestComponent } from './test/test.component';
import { SuccessComponent } from './success/success.component';
import { TeamComponent } from './team/team.component';
import { ProjectsComponent } from './projects/projects.component';
import { WhyjoinusComponent } from './whyjoinus/whyjoinus.component';
import { CotisationComponent } from './cotisation/cotisation.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ServicesComponent } from './services/services.component';
import { EventpostComponent } from './eventpost/eventpost.component';
import { EventsComponent } from './events/events.component';
import { PresseComponent } from './presse/presse.component';
import { BlogComponent } from './blog/blog.component';
import { NewspostComponent } from './newspost/newspost.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { OrganisationComponent } from './organisation/organisation.component';
import { SearchComponent } from './search/search.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FiwareComponent } from './fiware/fiware.component';
import { ProgramsComponent } from './programs/programs.component';
import { AdhesionComponent } from './adhesion/adhesion.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule} from '@angular/material/select';
import { CarriereComponent } from './carriere/carriere.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MediaComponent } from './media/media.component';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { MemberProfilComponent } from './member-profil/member-profil.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TitleComponent,
    FooterComponent,
    MissionsComponent,
    TestComponent,
    SuccessComponent,
    TeamComponent,
    ProjectsComponent,
    WhyjoinusComponent,
    CotisationComponent,
    PartenairesComponent,
    ServicesComponent,
    EventpostComponent,
    EventsComponent,
    PresseComponent,
    BlogComponent,
    NewspostComponent,
    OrganisationComponent,
    SearchComponent,
    FiwareComponent,
    ProgramsComponent,
    AdhesionComponent,
    CarriereComponent,
    MediaComponent,
    MemberProfilComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide : TranslateLoader,
        useFactory :(http:HttpClient) =>{return new TranslateHttpLoader(http,'../assets/i18n/',".json");},
        deps: [HttpClient]
      }
    }),
    MarkdownToHtmlModule,
    NoopAnimationsModule,
    MatIconModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
