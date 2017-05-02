import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { EditNetView } from './edit-net/edit-net';
import { NetService } from '../../services/net.service';

@Component({
  selector: 'page-nets',
  templateUrl: 'nets.html'
})
export class NetsPage {

  constructor(
      public navCtrl: NavController,
      public modalController: ModalController,
      public netService: NetService
  ) {

  }

  displayEditNetPopover(net) {
      let params = {
          net: net
      };
      let modal = this.modalController.create(EditNetView, params);
      modal.present();
  }

}
