import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { NetService } from '../../../services/net.service';
import { ContactsService } from '../../../services/contacts.service';

@Component({
    templateUrl: 'add-contacts.html',
    selector: 'modal-add-contacts'
})
export class AddContactsView {
    constructor(
        public modalController: ModalController,
        public navParams: NavParams,
        public viewController: ViewController,
        public loadingController: LoadingController,
        public netService: NetService,
        public contactService: ContactsService
    ) {

    }

    loading = this.loadingController.create({
        content: 'Loading Contacts',
        spinner: 'circles'
    })

    ionViewDidLoad() {
        this.loading.present();
        this.contactService.workingContacts = this.navParams.data.workingContacts;
        this.contactService.updateWorkingContacts().then(() => {
            this.displayPhoneNumbers.length = this.contactService.workingContacts.length;
            this.displayPhoneNumbers.fill(false);
            this.loading.dismiss();
        }).catch((err) => {
            // TODO notify user of error
        });
    }

    displayPhoneNumbers: any = [];

    close() {
        this.contactService.markWorkingContactsAsSelected();
        this.netService.selectedNet.contacts = this.contactService.workingContacts;
        this.viewController.dismiss();
    }

}
