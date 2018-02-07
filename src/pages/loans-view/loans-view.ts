import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoanPaymentPage} from "../loan-payment/loan-payment";



@IonicPage()
@Component({
  selector: 'page-loans-view',
  templateUrl: 'loans-view.html',
})
export class LoansViewPage {
    private client: any;
    private loans: any;
    private company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.client = navParams.get('client');
      this.company = navParams.get('company');
      this.loans = navParams.get('loans');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoansViewPage');
  }

    goToPayment(loan){
      this.navCtrl.push(LoanPaymentPage,{'loan':loan, company:this.company})

    }
}
