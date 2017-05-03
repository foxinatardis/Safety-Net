import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { INet } from '../interfaces/net.interface';
import { ContactsService } from './contacts.service';
@Injectable()

export class NetService {

    savedNets: Array<INet>;
    selectedNet: INet;


    constructor(
        private storage: Storage,
        private contactsService: ContactsService
    ) {
        this.storage.ready().then(() => {
            this.retrieveSavedNets();
        });

    }

    createNewSafetyNet() {
        let newSafetyNet: INet = {
                id: null,
                name: 'My New Net',
                contacts: []
            };
        return newSafetyNet;
    }

    retrieveSavedNets() {
        this.storage.get('savedNets').then((nets) => {
            if (!nets) {
                this.initializeSavedNets();
            } else {
                this.savedNets = nets;
            }
        });
    }

    saveSelectedNet() {
        return new Promise((resolve, reject) => {
            let selectedNetIsNew: boolean = !this.selectedNet.id;

            if(selectedNetIsNew) {
                this.createUniqueNetId();
                this.savedNets.push(this.selectedNet);
            } else {
                for(let i in this.savedNets) {
                    if(this.savedNets[i].id === this.selectedNet.id) {
                        this.savedNets[i] = this.selectedNet;
                    }
                }
            }

            this.saveToStorage('savedNets', this.savedNets)
                .then((value: Array<INet>) => {
                    this.savedNets = value;
                    resolve();
                }).catch((err) => {
                    console.log('error saving selected net');
                    console.log('error is: ', err);
                    reject(err);
                });
        });
    }

    deleteNet(net) {
        for(let index in this.savedNets) {
            console.log(typeof(index));
            if(this.savedNets[index].id === net.id) {
                this.savedNets.splice(parseInt(index), 1);
            }
        }
        this.saveToStorage('savedNets', this.savedNets);
    }

    saveToStorage(key: string, value: any) {
        return new Promise((resolve, reject) => {
            this.storage.set(key, value)
                .then(this.savedSuccessfully(resolve))
                .catch(this.saveFailed(reject));
        });
    }

    public cloneNet(net: INet) {
        let clonedNet: INet = {
            id: net.id,
            name: net.name,
            contacts: []
        }
        clonedNet.contacts = this.contactsService.cloneContacts(net.contacts);
        return clonedNet;
    }

    private createUniqueNetId() {
        let potentialId = Math.floor(Math.random() * 100000);
        let idIsUnique = this.checkUniquenessOfId(potentialId);

        if(idIsUnique) {
            this.selectedNet.id = potentialId;
        } else {
            this.createUniqueNetId();
        }
    }

    private checkUniquenessOfId(idToCheck) {
        for(let index in this.savedNets) {
            if(this.savedNets[index].id === idToCheck) {
                return false;
            }
        }
        return true;
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

    private initializeSavedNets() {
        this.savedNets = [];
        this.storage.set('savedNets', this.savedNets).then((val) => {
        }).catch((err) => {
            console.error("Error initializing 'savedNets': ", err);
            console.log();
        });
    }

}
