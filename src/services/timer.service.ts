import { Injectable } from "@angular/core";
import { ITimerOptions } from '../interfaces/timerOptions.interface';
import { INet } from '../interfaces/net.interface';
import { CustomMessage } from '../interfaces/customMessage.interface';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SMSService } from './sms.service';
import { LocationService } from './location.service';


@Injectable()
export class TimerService {
    constructor(
        private backgroundMode: BackgroundMode,
        private smsService: SMSService,
        private locationService: LocationService
    ) {

    }

    public countdownHours: number;
    public countdownMinutes: number;
    public countdownSeconds: number;
    private countdownInterval: number;
    public timerActive: boolean = false;
    private activeTimer: number;

    public startTimer(options: ITimerOptions) {
        let selectedPhoneNumbers: Array<string>;
        let duration: number;

        this.backgroundMode.enable();
        duration = this.calculateDuration(options.hours, options.minutes);
        this.countdownHours = Math.floor(duration / (1000 * 60 * 60));
        this.countdownMinutes = Math.floor(duration / 60000) % 60;
        this.countdownSeconds = Math.floor(duration / 1000) % 60;
        selectedPhoneNumbers = this.parseSelectedNumbersFromNet(options.net);

        this.timerActive = true;
        this.activeTimer = setTimeout(() => {
            this.locationService.getCurrentLocation()
            .then(() => {
                let messageToSend = this.appendLocationToMessage(options.message);
                this.sendAlert(selectedPhoneNumbers, messageToSend);
            });
        }, duration);
        this.countdownInterval = setInterval(() => {
            duration -= 500;
            this.countdownHours = Math.floor(duration / (1000 * 60 * 60));
            this.countdownMinutes = Math.floor(duration / 60000) % 60;
            this.countdownSeconds = Math.floor(duration / 1000) % 60;
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
        } catch (err) {
            console.log('error parsing selected numbers');
            console.log('error: ' + err);
        }

        return selectedPhoneNumbers;
    }

    private appendLocationToMessage(message: CustomMessage) {
        let googlemapsLinkText: string = 'https://www.google.com/maps/search/' + this.locationService.currentLatitude + '+' + this.locationService.currentLongitude;
        let locationMessage: string = message.message + '\nMy last known location was: ' + googlemapsLinkText;
        let messageToSend: CustomMessage = {
            id: message.id,
            title: message.title,
            message: locationMessage
        };

        return messageToSend;
    }

}
