import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDemoService {

  constructor(private _http: HttpClient) {
    this.login();
   }

  public login(){
    this._http.get(environment.baseUrl+'/adLogin?q=pankajunhale').subscribe((response:any)=>{
      console.log(response);      
    },(error:any)=>{
      console.log(error);      
    })
  }
}
