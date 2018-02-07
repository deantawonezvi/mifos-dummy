import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';


@Injectable()
export class UtilsProvider {

  constructor(public http: Http) {
    console.log('Hello UtilsProvider Provider');
  }

    getBaseUrl(){
        return "https://demo2.mifosx.net/fineract-provider/api/v1";
    }

    getApplicationUrl() {
        return "http://160.119.249.235/api";
    }

    getHeaders(company){
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization':'Basic '+ btoa('mifos:password'),
            'Fineract-Platform-TenantId':company
        };
        return {
            headers: new Headers(headerDict),
        }
    }
}
