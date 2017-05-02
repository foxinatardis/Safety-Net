import { Component } from '@angular/core';

import { NetsPage } from '../nets/nets';
import { TimerPage } from '../timer/timer';
import { MessagesPage } from '../messages/messages';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NetsPage;
  tab2Root = TimerPage;
  tab3Root = MessagesPage;

  constructor() {

  }
}
