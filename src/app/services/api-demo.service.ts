import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDemoService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private _http: HttpClient) {
    this.login();
   }

  public loginGet(){
    this._http.get(environment.baseUrl+'/adLogin?q=pankajunhale').subscribe((response:any)=>{
      console.log(response);      
    },(error:any)=>{
      console.log(error);      
    })
  }

  public login(){
    let data = {
      name:'pankaj',
      job:'temp'
    }
    this._http.post(environment.baseUrl+'/create',JSON.stringify(data)).subscribe((response:any)=>{
      console.log(response);      
    },(error:any)=>{
      console.log(error);      
    })
  }
}
