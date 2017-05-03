import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MessagesService } from '../../services/messages.service';
import { EditMessageView } from './edit-message/edit-message';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  constructor(
      public navCtrl: NavController,
      public modalController: ModalController,
      public messageService: MessagesService
  ) {

  }

  displayEditMessagePopover(message) {
      let params = {
          message: message
      };
      let modal = this.modalController.create(EditMessageView, params);
      modal.present();
  }

}
