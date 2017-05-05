import { Injectable } from "@angular/core";
import { CustomMessage } from '../interfaces/customMessage.interface';
import { SMS } from '@ionic-native/sms'

@Injectable()

export class SMSService {
    constructor(
        private sms: SMS
    ) {

    }

    public sendMessage(phoneNumbers: Array<string>, message: CustomMessage) {
        this.sms.send(phoneNumbers, message.message).then(() => {
            console.log('message sent successfullly');
        });
    }
}
