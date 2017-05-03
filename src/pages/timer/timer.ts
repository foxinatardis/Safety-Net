import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimerService } from '../../services/timer.service';

@Component({
    selector: 'page-timer',
    templateUrl: 'timer.html'
})
export class TimerPage {

    constructor(
        public navCtrl: NavController,
        public timerService: TimerService
    ) {

    }

}
