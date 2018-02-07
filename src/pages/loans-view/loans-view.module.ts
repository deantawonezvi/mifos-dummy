import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoansViewPage } from './loans-view';

@NgModule({
  declarations: [
    LoansViewPage,
  ],
  imports: [
    IonicPageModule.forChild(LoansViewPage),
  ],
})
export class LoansViewPageModule {}
