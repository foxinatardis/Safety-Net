import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Ionic Imports
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//  Services
import { NetService } from '../services/net.service';
import { ContactsService } from '../services/contacts.service';
// App
import { MyApp } from './app.component';
// Pages and Views
import { TabsPage } from '../pages/tabs/tabs';

import { NetsPage } from '../pages/nets/nets';
import { EditNetView } from '../pages/nets/edit-net/edit-net';
import { AddContactsView } from '../pages/nets/add-contacts/add-contacts';


import { TimerPage } from '../pages/timer/timer';

import { MessagesPage } from '../pages/messages/messages';

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
    ContactsService,
    Contacts,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
