import { Component } from "@angular/core";
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { MessagesService } from '../../../services/messages.service';

@Component({
    selector: "edit-message-popover",
    templateUrl: "edit-message.html",
})
export class EditMessageView {
    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private viewController: ViewController,
        private messageService: MessagesService
    ) {
        this.messageService.selectedMessage = {
            id: this.navParams.data.message.id,
            title: this.navParams.data.message.title,
            message: this.navParams.data.message.message
        }
    }

    close() {
        this.viewController.dismiss();
    }

    saveMessage() {
        this.messageService.saveSelectedMessage()
        .then(() => {
            this.close();
        })
        .catch(err => {
            console.log("error!!!!!");
            console.log();
            console.log(err);
            console.log();
        });
    }
}
