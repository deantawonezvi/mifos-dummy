import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {Headers, Http} from "@angular/http";
import * as _ from "lodash";
import {LoansViewPage} from "../loans-view/loans-view";


@IonicPage()
@Component({
    selector   : 'page-client-home',
    templateUrl: 'client-home.html',
})
export class ClientHomePage {
    headers: { headers: Headers; };
    url: string;
    private client: any;
    private company: any;

    constructor(public utilService: UtilsProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
        this.client = navParams.get('client');
        this.company = navParams.get('company');
        this.url = this.utilService.getBaseUrl();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClientHomePage');
    }

    endSession() {
        let prompt = this.alertCtrl.create({
            title  : 'End session',
            message: "By continuing you will end your current session, would you like to continue?",
            buttons: [
                {
                    text   : 'No',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text   : 'Yes',
                    handler: data => {
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        prompt.present();
    }

    viewLoans() {
        let loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        loader.present();
        this.http.get(this.url + '/loans', this.utilService.getHeaders(this.company.name))
            .subscribe(data => {
                loader.dismiss();
                let loans = []
                let active_loans = []
                loans = _.filter(data.json().pageItems, {clientAccountNo: this.client.accountNo});
                loans.forEach(function (loan) {
                    if(loan.status.active == true){
                        active_loans.push(loan)
                    }
                });
                if (loans.length == 0) {
                    let alert = this.alertCtrl.create({
                        title   : 'No Loans',
                        subTitle: 'There are no loans for this account number.',
                        buttons : ['Dismiss']
                    });
                    alert.present();
                    return;
                }
                this.navCtrl.push(LoansViewPage, {loans: active_loans, client: this.client, company:this.company});
                console.log(loans)
            }, error2 => {
                loader.dismiss();
                if (error2.status == 404) {
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
        console.log('Loans')
    }


}
