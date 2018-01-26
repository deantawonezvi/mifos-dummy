import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {UtilsProvider} from "../../providers/utils/utils";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    headers: any;
    url: any;
    account: string =null;

    constructor(public utilService:UtilsProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
      this.url = this.utilService.getBaseUrl();
      this.headers = this.utilService.getHeaders();

  }

    process(){
        if(!this.account){
            let alert = this.alertCtrl.create({
                title   : 'Missing Account',
                subTitle: 'Please make sure you entered a valid account number.',
                buttons : ['OK']
            });
            alert.present();
            return;

        }
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.http.get(this.url + '/clients/'+this.account+'?template=true',this.headers)
        .subscribe(data=>{
            loader.dismiss();
            console.log(data.json())
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

}
