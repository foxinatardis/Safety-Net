import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
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
        public netService: NetService,
        public contactService: ContactsService
    ) {
        this.contactService.workingContacts = this.navParams.data.workingContacts;
        this.contactService.updateWorkingContacts();
        this.displayPhoneNumbers.length = this.contactService.workingContacts.length;
        console.log(this.contactService.workingContacts.length);
        this.displayPhoneNumbers.fill(false);
    }

    displayPhoneNumbers: any = [];

    close() {
        this.contactService.markWorkingContactsAsSelected();
        this.netService.selectedNet.contacts = this.contactService.workingContacts;
        this.netService.saveSelectedNet().then(() => {
            this.viewController.dismiss();
        });
    }

}
