import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { NetService } from '../../../services/net.service';
import { AddContactsView } from '../add-contacts/add-contacts'
import { INet } from '../../../interfaces/net.interface';

@Component({
    templateUrl: 'edit-net.html',
    selector: 'modal-edit-net'
})

export class EditNetView {

    constructor(
        public modalController: ModalController,
        public navParams: NavParams,
        public viewController: ViewController,
        public netService: NetService
    ) {
        this.netService.selectedNet = this.navParams.data.net;
    }

    close() {
        this.viewController.dismiss();
    }

    saveNet() {
        this.netService.saveSelectedNet()
            .then(() => {
                this.close();
            });
    }

    displayAddContactsModal() {
        let params = {
            workingContacts: (this.netService.selectedNet.contacts ? this.netService.selectedNet.contacts : [])
        };
        let modal = this.modalController.create(AddContactsView, params);
        modal.present();
    }

    removeContact(contact) {
        contact.selected = false;
        contact.phoneNumbers.forEach((numberField) => {
            numberField.selected = false;
        });
        this.netService.saveSelectedNet();
    }

}
