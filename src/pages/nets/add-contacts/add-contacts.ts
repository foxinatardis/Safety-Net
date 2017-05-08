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

    loading;
    displayPhoneNumbers: any = [];
    displayContacts: any = [];
    filter: string = '';

    ionViewDidLoad() {
        this.showLoadingSpinner();
        this.contactService.workingContacts = this.navParams.data.workingContacts;
        this.contactService.updateWorkingContacts().then(() => {
            this.displayPhoneNumbers.length = this.contactService.workingContacts.length;
            this.displayContacts.length = this.contactService.workingContacts.length;
            this.displayPhoneNumbers.fill(false);
            this.displayContacts.fill(true);
            this.dismissLoadingSpinner();
        }).catch((err) => {
            // TODO notify user of error
        });
    }



    close() {
        this.contactService.markWorkingContactsAsSelected();
        this.netService.selectedNet.contacts = this.contactService.workingContacts;
        this.viewController.dismiss();
    }

    filterContacts() {
        this.displayContacts.fill(true);
        for(let i in this.contactService.workingContacts) {
            let lowerCaseDisplayName = this.contactService.workingContacts[i].displayName.toLowerCase();
            let filter = this.filter.toLowerCase();
            if(lowerCaseDisplayName.indexOf(filter) === -1) {
                this.displayContacts[i] = false;
            }
        }
    }

    showLoadingSpinner() {
        this.loading = this.loadingController.create({
            content: 'Loading Contacts',
            spinner: 'circles'
        });
        this.loading.present();
    }

    dismissLoadingSpinner() {
        this.loading.dismiss();
    }

}
