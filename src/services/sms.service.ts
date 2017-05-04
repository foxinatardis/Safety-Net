import { Injectable } from "@angular/core";
import { CustomMessage } from '../interfaces/customMessage.interface';
import { SMS } from '@ionic-native/sms'

@Injectable()

export class SMSService {
    constructor(
        private sms: SMS
    ) {

    }

    public test() {
        this.sms.send('7745731610', 'What up yo?');
    }

    public sendMessage(phoneNumbers: Array<string>, message: CustomMessage) {
        console.log('Sending message to: ', phoneNumbers);
        console.log('Message is: ', message.message);
        this.sms.send(phoneNumbers, message.message).then(() => {
            console.log('message sent successfullly');
        });
    }
}
