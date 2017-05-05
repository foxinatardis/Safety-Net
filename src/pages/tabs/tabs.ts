import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NetsPage } from '../nets/nets';
import { TimerPage } from '../timer/timer';
import { MessagesPage } from '../messages/messages';
// import { PermissionCheckPopover } from '../permissionChecks/permissionCheck';

import { ContactsService } from '../../services/contacts.service';
import { MessagesService } from '../../services/messages.service';
import { NetService } from '../../services/net.service';
import { SMSService } from '../../services/sms.service';
import { TimerService } from '../../services/timer.service';
import { LocationService } from '../../services/location.service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NetsPage;
  tab2Root = TimerPage;
  tab3Root = MessagesPage;

  constructor(
      private contactsService: ContactsService,
      private messagesService: MessagesService,
      private netService: NetService,
      private smsService: SMSService,
      private timerService: TimerService,
      private locationService: LocationService,
      public alertController: AlertController
  ) {

  }

    ionViewDidEnter() {
        this.checkAllPermissions();
    }

    checkAllPermissions() {
        this.locationService.checkPermission()
        .then(() => {
            this.contactsService.checkPermission();
        })
        .catch((err) => {
        //   let permissionCheckPopover = this.popoverController.create(PermissionCheckPopover, {}, popoverOptions);
        //   permissionCheckPopover.onDidDismiss(() => {
        //       this.checkAllPermissions();
        //   });
        //   permissionCheckPopover.present();
            console.log('err.permission is: ' + err.permission);
            if(err.permission) {
                return this.checkAllPermissions();
            } else {
                let noPermissionAlert = this.alertController.create({
                    title: 'Permission Error',
                    message: 'safetyNet needs permission to access your contacts as well as SMS and Location services.',
                    buttons: ['Dismiss']
                });
                noPermissionAlert.onDidDismiss(() => {
                    this.checkAllPermissions();
                });
                noPermissionAlert.present();
            }

        });
    }


}
