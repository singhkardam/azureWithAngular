import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';

import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Configuration } from 'msal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DataService } from 'src/app/services/data.service';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ServiceCallComponent } from './components/call/service-call/service-call.component';
import { from } from 'rxjs';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: '5dd3ba80-6ae2-4625-9f4f-6b77b5c6d751',
      authority: "https://login.microsoftonline.com/ff3f5973-8dab-44a5-a56e-485e01ff0c50",
      validateAuthority: true,
      redirectUri: window.location.origin,
      //postLogoutRedirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: window.location.origin,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      "openid",
      "api://5dd3ba80-6ae2-4625-9f4f-6b77b5c6d751/calleverything"
    ],
    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    extraQueryParameters: {}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductDescriptionComponent,
    ServiceCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataService,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
