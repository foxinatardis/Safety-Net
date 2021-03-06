import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Ionic Imports
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/sms';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//  Services
import { NetService } from '../services/net.service';
import { ContactsService } from '../services/contacts.service';
import { MessagesService } from '../services/messages.service';
import { TimerService } from '../services/timer.service';
import { SMSService } from '../services/sms.service';
import { LocationService } from '../services/location.service';
// App
import { MyApp } from './app.component';
// Pages and Views
import { TabsPage } from '../pages/tabs/tabs';
// import { PermissionCheckPopover } from '../pages/permissionChecks/permissionCheck';

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
    TabsPage,
    // PermissionCheckPopover
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
    TabsPage,
    // PermissionCheckPopover
  ],
  providers: [
    NetService,
    ContactsService,
    MessagesService,
    TimerService,
    SMSService,
    LocationService,
    Contacts,
    BackgroundMode,
    SMS,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
