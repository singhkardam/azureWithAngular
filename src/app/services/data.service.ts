import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from "@angular/common/http";
import { MsalService } from '@azure/msal-angular';
@Injectable({
  providedIn: 'root'
})
export class DataService implements HttpInterceptor{

  getToken:string = '';
  setCustomeToken:any = '';
  liveToken:string = '';
  requestObj:object = {
    scopes: ["openid","api://5dd3ba80-6ae2-4625-9f4f-6b77b5c6d751/calleverything"],
    clientId: '5dd3ba80-6ae2-4625-9f4f-6b77b5c6d751',
  }
  
  constructor(
    private httpClient: HttpClient,
    private authService: MsalService    
  ) { }




  
  recivedataWithToken(config){
    return this.httpClient.get('https://apiappacttolead.azurewebsites.net/api/machinebycustomerv2', config);
  }

  token(){
    this.authService.acquireTokenSilent(this.requestObj).then((tokenResponse) => {
      this.getToken = tokenResponse.accessToken;
      this.setCustomeToken = localStorage.setItem('customToken', this.getToken);
      //console.log(this.getToken);
    });  
  } 


  intercept(res, next){
    this.getToken = localStorage.getItem('customToken');
    var tokenizedreq = res.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken}`
      }
    })
    return next.handle(tokenizedreq);
  }
  


}
