import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser,InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {UtilsProvider} from "../../providers/utils/utils";


@IonicPage()
@Component({
    selector   : 'page-loan-payment',
    templateUrl: 'loan-payment.html',
})
export class LoanPaymentPage {
    app_url: any;
    private loan: any;
    private amount: any;

    options : InAppBrowserOptions = {
        location : 'yes',//Or 'no'
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only
        toolbar : 'yes', //iOS only
        enableViewportScale : 'no', //iOS only
        allowInlineMediaPlayback : 'no',//iOS only
        presentationstyle : 'pagesheet',//iOS only
        fullscreen : 'yes',//Windows only
    };
    private company: any;

    constructor(public utilService:UtilsProvider,private theInAppBrowser: InAppBrowser,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
        this.loan = navParams.get('loan');
        this.company = navParams.get('company');
        this.app_url = this.utilService.getApplicationUrl();

        console.log(this.company)
        console.log(this.loan)

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoanPaymentPage');
    }

    presentPrompt(){
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });
        let alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'You are now going to be directed to Paynow to complete your ' + formatter.format(this.amount) + ' payment.' ,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        this.goToPayment()
                    }
                }
            ]
        });
        alert.present();
    }

    goToPayment() {

        let target = "_self";
        let url = this.app_url+'/paynow/initiate?reference='+this.loan.accountNo+'&additional_info=LoanPayments&amount='+this.amount+'&key='+this.company.integration_key+'&id='+this.company.integration_id+'&name='+this.company.name
        this.theInAppBrowser.create(encodeURI(url),target,this.options);

    }


}
