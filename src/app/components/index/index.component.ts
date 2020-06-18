import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { DataService } from 'src/app/services/data.service';
import { DataWithToken } from 'src/app/models/data-with-token';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loggedIn:boolean = false;
  spinner:boolean = false;
  config:string = '';
  itemIndex:number;
  dataWithToken:DataWithToken[] = [];

  constructor(
    private broadcastService: BroadcastService, 
    private authService: MsalService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.checkoutAccount();
    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkoutAccount();
      this.dataService.token();
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      //console.log('Redirect Success: ', response);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      //console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));

    if(this.loggedIn){
      this.getDataWithToken();      
    }
  }


  checkoutAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  logout() {
    this.authService.logout();
    this.authService.getRedirectUri();
    localStorage.clear();
  }



  getDataWithToken(){
    this.config = localStorage.getItem('customToken');
    this.spinner = true;
    this.dataService.recivedataWithToken(this.config).subscribe(
      (data: any) => {
        this.dataWithToken = data;
        console.log(this.dataWithToken); 
        this.spinner = false;
      }
    );
  
  }

  moreInfo(){

  }

  machineByCustomer(){}


}
