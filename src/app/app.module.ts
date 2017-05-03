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
import { MessagesService } from '../services/messages.service';
import { TimerService } from '../services/timer.service';
// App
import { MyApp } from './app.component';
// Pages and Views
import { TabsPage } from '../pages/tabs/tabs';

import { NetsPage } from '../pages/nets/nets';
import { EditNetView } from '../pages/nets/edit-net/edit-net';
import { AddContactsView } from '../pages/nets/add-contacts/add-contacts';


import { TimerPage } from '../pages/timer/timer';

import { MessagesPage } from '../pages/messages/messages';
import { EditMessageView } from '../pages/messages/edit-message/edit-message';

@NgModule({
  declarations: [
    MyApp,
    NetsPage,
    EditNetView,
    AddContactsView,
    TimerPage,
    MessagesPage,
    EditMessageView,
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
    EditMessageView,
    TabsPage
  ],
  providers: [
    NetService,
    ContactsService,
    MessagesService,
    TimerService,
    Contacts,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
