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

    }

    ionViewDidLoad() {
        console.log('View Loaded');
        this.contactService.workingContacts = this.navParams.data.workingContacts;
        this.contactService.updateWorkingContacts().then(() => {
            this.displayPhoneNumbers.length = this.contactService.workingContacts.length;
            console.log('working contacts updated!');
            console.log();
            console.log(this.contactService.workingContacts.length);
            this.displayPhoneNumbers.fill(false);
        }).catch((err) => {
            console.log('error updating working contacts in add-contacts.ts');
            console.log('error: ', err);
        });
    }

    displayPhoneNumbers: any = [];

    close() {
        this.contactService.markWorkingContactsAsSelected();
        this.netService.selectedNet.contacts = this.contactService.workingContacts;
        this.viewController.dismiss();
    }

}
