import { Injectable } from "@angular/core";
import { ITimerOptions } from '../interfaces/timerOptions.interface';
import { INet } from '../interfaces/net.interface';
import { CustomMessage } from '../interfaces/customMessage.interface';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SMSService } from './sms.service';


@Injectable()
export class TimerService {
    constructor(
        private backgroundMode: BackgroundMode,
        private smsService: SMSService
    ) {

    }

    public countdownHours: number;
    public countdownMinutes: number;
    public countdownSeconds: number;
    private countdownInterval: number;
    public timerActive: boolean = false;
    private activeTimer: number;

    public startTimer(options: ITimerOptions) {
        console.log('starting timer');
        let selectedPhoneNumbers: Array<string>;
        let duration: number;

        this.backgroundMode.enable();
        duration = this.calculateDuration(options.hours, options.minutes);
        this.countdownHours = Math.floor(duration / (1000 * 60 * 60));
        this.countdownMinutes = Math.floor(duration / 60000) % 60;
        this.countdownSeconds = Math.floor(duration / 1000) % 60;
        // TODO remove duration reset below
        duration = 5000;
        selectedPhoneNumbers = this.parseSelectedNumbersFromNet(options.net);
        /* TODO still need to get location and append to message though that should
        happen in the return function so location reflects
        when message was sent not when timer was set */
        this.timerActive = true;
        this.activeTimer = setTimeout(() => {
            this.sendAlert(selectedPhoneNumbers, options.message)
        }, duration);
        this.countdownInterval = setInterval(() => {
            duration -= 500;
            this.countdownHours = Math.floor(duration / (1000 * 60 * 60));
            this.countdownMinutes = Math.floor(duration / 60000) % 60;
            this.countdownSeconds = Math.floor(duration / 1000) % 60;
            // console.log(this.activeTimer);
        }, 500)

    }

    public cancelTimer() {
        clearTimeout(this.activeTimer);
        clearInterval(this.countdownInterval);
        this.timerActive = false;
        this.backgroundMode.disable();
    }

    private calculateDuration(hours: number, minutes: number) {
        let duration: number = 0;
        let hoursToMilliSeconds = hours * 60 * 60 * 1000;
        let minutesToMilliSeconds = minutes * 60 * 1000;
        duration = hoursToMilliSeconds + minutesToMilliSeconds;
        return duration;
    }

    private sendAlert(phoneNumbers: Array<string>, message: CustomMessage) {
        this.cancelTimer();
        console.log('timer expired');
        this.smsService.sendMessage(phoneNumbers, message);
    }

    private parseSelectedNumbersFromNet(net: INet) {
        let selectedPhoneNumbers: Array<string> = [];
        try {
            net.contacts.forEach((contact) => {
                if(contact.selected) {
                    contact.phoneNumbers.forEach((numberField) => {
                        if(numberField.selected) {
                            let formattedPhoneNumberString = '';
                            for(let char of numberField.value) {
                                let charToNumber = parseInt(char);
                                if(charToNumber >= 0 || charToNumber < 10) {
                                    formattedPhoneNumberString += charToNumber;
                                }
                            }
                            selectedPhoneNumbers.push(formattedPhoneNumberString);
                        }
                    });
                }
            });
            console.log('selectedPhoneNumbers: ' + selectedPhoneNumbers);
        } catch (err) {
            console.log('error parsing selected numbers');
            console.log('error: ' + err);
        }

        return selectedPhoneNumbers;
    }

}
