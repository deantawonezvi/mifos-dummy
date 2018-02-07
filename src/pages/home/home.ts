import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {UtilsProvider} from "../../providers/utils/utils";
import {ClientHomePage} from "../client-home/client-home";
import * as _ from 'lodash'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    companies: any;
    app_url: string;
    headers: any;
    url: any;
    account: string =null;
    company: any = null;

    constructor(public utilService:UtilsProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
      this.url = this.utilService.getBaseUrl();
      this.app_url = this.utilService.getApplicationUrl();

      this.http.get(this.app_url + '/company/get')
          .subscribe(data=>{
              this.companies = data.json();
              console.log(this.companies)
            console.log(data.json())
          }, error2 => {
            console.log(error2)
          })


  }

    process(){

        console.log(this.company);
        if(!this.account){
            let alert = this.alertCtrl.create({
                title   : 'Missing Account',
                subTitle: 'Please make sure you entered a valid account number.',
                buttons : ['OK']
            });
            alert.present();
            return;

        }
        if(!this.company){
            let alert = this.alertCtrl.create({
                title   : 'Missing Company',
                subTitle: 'Please make sure you selected a company.',
                buttons : ['OK']
            });
            alert.present();
            return;

        }

        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        console.log(this.headers);
        let selected_company = _.filter(this.companies,{name:this.company});
        console.log(selected_company);
        this.http.get(this.url + '/clients/'+this.account+'?template=true',this.utilService.getHeaders(this.company))
        .subscribe(data=>{
            loader.dismiss();
            console.log(data.json());
            this.navCtrl.push(ClientHomePage,{client:data.json(),company:selected_company[0]});
        }, error2 => {
            loader.dismiss();
            if(error2.status == 404){
                let alert = this.alertCtrl.create({
                    title   : 'Invalid Account',
                    subTitle: 'Please make sure you entered a valid account number.',
                    buttons : ['OK']
                });
                alert.present();
                return;
            }
            let alert = this.alertCtrl.create({
                title   : 'Error',
                subTitle: 'Something Went Wrong Please Try Again.',
                buttons : ['Dismiss']
            });
            alert.present();
            return;


        });
    console.log('test')

  }

    ionViewDidLoad() {
        this.account = null;
        console.log('ionViewDidLoad HomePage');
    }
    ionViewDidEnter(){
        this.account = null;
    }



}
