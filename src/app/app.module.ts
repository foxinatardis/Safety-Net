import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { NetsPage } from '../pages/nets/nets';
import { EditNetView } from '../pages/nets/edit-net/edit-net';
import { AddContactsView } from '../pages/nets/add-contacts/add-contacts';


import { TimerPage } from '../pages/timer/timer';

import { MessagesPage } from '../pages/messages/messages';

import { TabsPage } from '../pages/tabs/tabs';

import { NetService } from '../services/net.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    NetsPage,
    EditNetView,
    AddContactsView,
    TimerPage,
    MessagesPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
     name: '_safetyNetStorage'
   })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NetsPage,
    EditNetView,
    AddContactsView,
    TimerPage,
    MessagesPage,
    TabsPage
  ],
  providers: [
    NetService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
