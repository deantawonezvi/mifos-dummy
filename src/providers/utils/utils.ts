import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';


@Injectable()
export class UtilsProvider {

  constructor(public http: Http) {
    console.log('Hello UtilsProvider Provider');
  }

    getBaseUrl(){
        return "https://demo2.mifosx.net/fineract-provider/api/v1";
    }

    getHeaders(){
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization':'Basic '+ btoa('mifos:password'),
            'Fineract-Platform-TenantId':'demo2'
        };
        return {
            headers: new Headers(headerDict),
        }
    }
}
