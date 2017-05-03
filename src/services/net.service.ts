import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { INet } from '../interfaces/net.interface';

@Injectable()

export class NetService {

    savedNets: Array<INet>;
    selectedNet: INet;


    constructor(
        public storage: Storage
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
        console.log('retireving saved nets');
        console.log();
        console.log('retireving saved nets');
        console.log();
        this.storage.get('savedNets').then((nets) => {
            // if (!nets) {
                this.initializeSavedNets();
            // } else {
            //     console.log('nets found!!!');
            //     console.log();
            //     this.savedNets = nets;
            // }
        });
    }

    saveSelectedNet() {
        return new Promise((resolve, reject) => {
            console.log('saving selected net...');
            let selectedNetIsNew: boolean = !this.selectedNet.id;

            if(selectedNetIsNew) {
                console.log('net is new');
                this.createUniqueNetId();
                this.savedNets.push(this.selectedNet);
            } else {
                console.log('net is not new');
                for(let i in this.savedNets) {
                    console.log(this.savedNets[i].id);
                    if(this.savedNets[i].id === this.selectedNet.id) {
                        console.log('net found!!!');
                        console.log();
                        console.log(this.selectedNet.name);
                        this.savedNets[i] = this.selectedNet;
                        console.log(this.savedNets[i].name);
                    }
                }
            }

            this.saveToStorage('savedNets', this.savedNets)
                .then((value: Array<INet>) => {
                    this.savedNets = value;
                    value.forEach((net) => {
                        console.log(net.name);
                        console.log();
                    })
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

    private createUniqueNetId() {
        console.log('creating new id...')
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
        console.log('initializing...');
        console.log();
        console.log('initializing...');
        console.log();
        this.savedNets = [];

        this.storage.set('savedNets', this.savedNets).then((val) => {
            console.log("savedNets initialized");
            console.log();
        }).catch((err) => {
            console.error("Error initializing 'savedNets': ", err);
            console.log();
        });
    }

}
