import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { NetService } from '../../../services/net.service';

@Component({
    templateUrl: 'add-contacts.html',
    selector: 'modal-add-contacts'
})
export class AddContactsView {
    constructor(
        public modalController: ModalController,
        public navParams: NavParams,
        public viewController: ViewController,
        public netService: NetService
    ) {}

    close() {
        this.viewController.dismiss();
    }

    
}
