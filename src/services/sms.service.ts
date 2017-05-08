import { Injectable } from "@angular/core";
import { CustomMessage } from '../interfaces/customMessage.interface';
import { SMS } from '@ionic-native/sms'

@Injectable()

export class SMSService {
    constructor(
        private sms: SMS
    ) {

    }

    public sendMessage(phoneNumber: string, message: CustomMessage) {
        return new Promise((resolve, reject) => {
            this.sms.send(phoneNumber, message.message)
            .then(() => {
                console.log('message sent successfullly');
                resolve();
            })
            .catch((err) => {
                reject(phoneNumber);
            });
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
