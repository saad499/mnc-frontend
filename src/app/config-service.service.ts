import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemeberProfil } from './models/memberprofil';
@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  host = environment.host;
  private baseUrl = "http://localhost:9252/member-profils";
  constructor(private http:HttpClient) {

   }
   get(url){
    return this.http.get(environment.host+url);
   }
   getId(id:number){
    const url = `/member-profils/${id}`;
    return this.http.get(environment.host+url);
   }
   post(url,data){
    return this.http.post(environment.host+url,data);
   }
   posth(url,data,h){
    return this.http.post(environment.host+url,data,h);
   }

   getMemberProfilList():Observable<MemeberProfil[]>{
    return this.http.get<MemeberProfil[]>(`${this.baseUrl}`);
   }


   getMemberProfilById(id: number):Observable<MemeberProfil>{
    return this.http.get<MemeberProfil>(`${this.baseUrl}/${id}`);
   }
}
