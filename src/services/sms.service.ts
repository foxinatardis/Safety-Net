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

    public checkPermission() {
        return new Promise((resolve, reject) => {
            this.sms.hasPermission()
                .then((hasPermission) => {
                    if(hasPermission) {
                        resolve();
                    } else {
                        reject({
                            permission: false,
                            message: 'Safety Net needs access to SMS Services in order to alert your selected contacts.'
                        });
                    }
                })
                .catch((err) => {
                    reject({
                        permission: false,
                        message: 'Safety Net needs access to SMS Services in order to alert your selected contacts.'
                    });
                });
        });
    }
}
