import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpModule} from '@angular/http';
import {UtilsProvider} from '../providers/utils/utils';
import {ClientHomePage} from "../pages/client-home/client-home";
import {LoansViewPage} from "../pages/loans-view/loans-view";
import {LoanPaymentPage} from "../pages/loan-payment/loan-payment";
import {InAppBrowser} from "@ionic-native/in-app-browser";


@NgModule({
    declarations   : [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        ClientHomePage,
        LoansViewPage,
        LoanPaymentPage
    ],
    imports        : [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap      : [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        ClientHomePage,
        LoansViewPage,
        LoanPaymentPage
    ],
    providers      : [
        UtilsProvider,
        StatusBar,
        SplashScreen,
        InAppBrowser,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UtilsProvider
    ]
})
export class AppModule {
}
