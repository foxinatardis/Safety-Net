import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
        public netService: NetService,
        private alertController: AlertController
    ) {
        this.netService.selectedNet = null;
        this.messagesService.selectedMessage = null;
        this.hourOptions.length = 100;
        this.minuteOptions.length = 60;
        this.fillArrayIncrementally(this.hourOptions);
        this.fillArrayIncrementally(this.minuteOptions);

    }
    selectedNetId: number;
    selectedMessageId: number;
    hourOptions: Array<number> = [];
    minuteOptions: Array<number> = [];
    hourSelection: string;
    minuteSelection: string;

    updateSelectionsAndStartTimer() {
        this.netService.selectNetById(this.selectedNetId);
        this.messagesService.selectMessageById(this.selectedMessageId);
        this.startTimer();
    }

    private startTimer() {
        let allFieldsSelected: boolean = !!(this.netService.selectedNet && this.messagesService.selectedMessage && this.hourSelection && this.minuteSelection);
        if(allFieldsSelected) {
            let timerOptions: ITimerOptions = {
                net: this.netService.selectedNet,
                message: this.messagesService.selectedMessage,
                hours: parseInt(this.hourSelection),
                minutes: parseInt(this.minuteSelection)
            };

            this.timerService.startTimer(timerOptions);
        } else {
            let selectAllFieldsAlert = this.alertController.create({
                title: 'Missing Information',
                message: 'Please select all required fields before starting a timer.',
                buttons: ['Dismiss']
            });

            selectAllFieldsAlert.present();
        }
    }

    private fillArrayIncrementally(arrayToFill: Array<number>) {
        for(let i in arrayToFill) {
            arrayToFill[i] = parseInt(i);
        }
    }

}
