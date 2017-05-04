import { Component } from '@angular/core';

import { NetsPage } from '../nets/nets';
import { TimerPage } from '../timer/timer';
import { MessagesPage } from '../messages/messages';

import { ContactsService } from '../../services/contacts.service';
import { MessagesService } from '../../services/messages.service';
import { NetService } from '../../services/net.service';
import { SMSService } from '../../services/sms.service';
import { TimerService } from '../../services/timer.service';

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
      private timerService: TimerService
  ) {
      this.smsService.test();
  }
}
