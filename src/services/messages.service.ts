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
    selectedMessage: CustomMessage;

    public createNewMessage() {
        let newMessage: CustomMessage = {
            id: null,
            title: 'New Message',
            message: 'Your content goes here...'
        }

        return newMessage;
    }

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

    private createUniqueNetId() {
        let potentialId = Math.floor(Math.random() * 100000);
        let idIsUnique = this.checkUniquenessOfId(potentialId);

        if(idIsUnique) {
            this.selectedMessage.id = potentialId;
        } else {
            this.createUniqueNetId();
        }
    }

    private checkUniquenessOfId(idToCheck) {
        for(let index in this.customMessages) {
            if(this.customMessages[index].id === idToCheck) {
                return false;
            }
        }
        return true;
    }

    public saveSelectedMessage() {
        return new Promise((resolve, reject) => {
            let selectedMessageIsNew: boolean = !this.selectedMessage.id;

            if(selectedMessageIsNew) {
                this.createUniqueNetId();
                this.customMessages.push(this.selectedMessage);
            } else {
                for(let i in this.customMessages) {
                    if(this.customMessages[i].id === this.selectedMessage.id) {
                        this.customMessages[i] = this.selectedMessage;
                    }
                }
            }

            this.saveToStorage('savedMessages', this.customMessages)
                .then((value: Array<CustomMessage>) => {
                    this.customMessages = value;
                    resolve();
                }).catch((err) => {
                    console.log('error saving selected net');
                    console.log('error is: ', err);
                    reject(err);
                });
        });
    }

    public deleteMessage(message) {
        for(let index in this.customMessages) {
            if(this.customMessages[index].id === message.id) {
                this.customMessages.splice(parseInt(index), 1);
            }
        }
        this.saveToStorage('savedNets', this.customMessages);
    }

    private saveToStorage(key: string, value: any) {
        return new Promise((resolve, reject) => {
            this.storage.set(key, value)
                .then(this.savedSuccessfully(resolve))
                .catch(this.saveFailed(reject));
        });
    }

    private savedSuccessfully(resolve) {
        return function _savedSuccessfully(value) {
            resolve(value);
        }
    }

    private saveFailed(reject) {
        return function _saveFailed(err) {
            reject(err);
        }
    }
}
