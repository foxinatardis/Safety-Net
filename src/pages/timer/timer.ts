import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimerService } from '../../services/timer.service';
import { MessagesService } from '../../services/messages.service';
import { NetService } from '../../services/net.service';
import { ITimerOptions } from '../../interfaces/timerOptions.interface';

@Component({
    selector: 'page-timer',
    templateUrl: 'timer.html'
})
export class TimerPage {

    constructor(
        public navCtrl: NavController,
        public timerService: TimerService,
        public messagesService: MessagesService,
        public netService: NetService
    ) {

    }

    startTimer() {
        // stub

    }

}
