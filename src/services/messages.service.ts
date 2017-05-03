import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { CustomMessage } from '../interfaces/customMessage.interface';

@Injectable()
export class MessagesService {
    constructor(
        private storage: Storage
    ) {
        this.setupMessagesService();
    }

    customMessages: Array<CustomMessage>;

    public retrieveSavedMessages() {
        return new Promise((resolve, reject) => {
            this.storage.get('savedMessages')
                .then((messages: Array<CustomMessage>) => {
                    resolve(messages);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    public saveCustomMessages() {
        return new Promise((resolve, reject) => {
            this.storage.set('savedMessages', this.customMessages)
                .then((messages: Array<CustomMessage>) => {
                    resolve();
                }).catch(err => {
                    console.log("error saving custom messages!!!");
                    console.log();
                    reject(err);
                });
        });

    }

    private initializeSavedMessages() {
        return new Promise((resolve, reject) => {
            this.storage.set('savedMessages', [])
                .then((messages: Array<CustomMessage>) => {
                    resolve(messages);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    private setupMessagesService() {
        this.retrieveSavedMessages()
            .then((messages: Array<CustomMessage>) => {
                if(!messages) {
                    this.initializeSavedMessages()
                    .then((messages: Array<CustomMessage>) => {
                        this.customMessages = messages;
                    })
                    .catch(err => {
                        console.log("error initializing saved messages");
                        console.log('error: ' + err);
                        console.log();
                    })
                } else {
                    this.customMessages = messages;
                }
            });
    }
}
