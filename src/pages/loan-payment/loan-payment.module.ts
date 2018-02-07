import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanPaymentPage } from './loan-payment';

@NgModule({
  declarations: [
    LoanPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(LoanPaymentPage),
  ],
})
export class LoanPaymentPageModule {}
