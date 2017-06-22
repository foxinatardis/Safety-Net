import { Injectable } from "@angular/core";
import { CustomMessage } from '../interfaces/customMessage.interface';
import { SMS } from '@ionic-native/sms'
import { AlertController } from 'ionic-angular';

@Injectable()

export class SMSService {
    constructor(
        private sms: SMS,
        private alertController: AlertController
    ) {

    }

    private userPhoneNumber: string;

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
                            smsTest: true,
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

    public sendTestMessage() {
        return new Promise((resolve, reject) => {
            let message = "Receipt of this message indicates that Safety Net is operating properly.";

            this.sms.send(this.userPhoneNumber, message)
                .then(() => {
                    resolve();
                }).catch((err) => {
                    reject({
                        permission: false,
                        message: 'Safety Net needs access to SMS Services in order to alert your selected contacts.'
                    });
                })
        });
    }

    public promptForTestMessage() {
        return new Promise((resolve, reject) => {
            let prompt = this.alertController.create({
                title: 'SMS Test',
                message: 'Safety Net needs access to SMS services, please enter your phone number to send a test text. If configured properly, this process should only run once.',
                inputs: [
                    {
                        name: 'phoneNumber',
                        placeholder: 'Your Phone Number',
                        type: 'text'
                    }
                ],
                buttons: [
                    {
                        text: 'Send',
                        handler: data => {
                            this.userPhoneNumber = data.phoneNumber;
                            resolve();
                        }
                    }
                ]
            });
            prompt.present()
        });
    }
}
