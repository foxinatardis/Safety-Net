import { Injectable } from "@angular/core";
import { Contacts, Contact, ContactField, ContactName, IContactField } from '@ionic-native/contacts';
import { FormattedContact } from '../interfaces/formattedContact.interface';
import { ExtendedContactField } from '../interfaces/extendedContactField.interface';

@Injectable()
export class ContactsService {
    constructor(
        private contacts: Contacts
    ) {

    }

    rawContacts: Array<Contact> = [];
    formattedContacts: Array<FormattedContact> = [];
    workingContacts: Array<FormattedContact> = [];

    public cloneContacts(contacts: Array<FormattedContact>) {
        let clonedContacts: Array<FormattedContact> = [];

        contacts.forEach((contact) => {
            let contactClone: FormattedContact = {
                id: contact.id,
                displayName: contact.displayName,
                phoneNumbers: [],
                selected: contact.selected
            };

            contact.phoneNumbers.forEach((numberField) => {
                let numberFieldClone = {
                    type: numberField.type,
                    value: numberField.value,
                    selected: numberField.selected
                }

                contactClone.phoneNumbers.push(numberFieldClone);
            });

            clonedContacts.push(contactClone);
        });

        return clonedContacts;
    }

    private getFormattedContacts() {
        return new Promise((resolve, reject) => {
            this.getAllContacts()
            .then((allContacts: Array<Contact>) => {
                this.formattedContacts = this.formatContacts(allContacts);
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private getAllContacts() {
        return new Promise((resolve, reject) => {
            let findOptions = {
                multiple: true,
                desiredFields: [
                    'id',
                    'displayName',
                    'phoneNumbers'
                ]
            };
            this.contacts.find(['name'], findOptions)
            .then((allContacts) => {
                this.rawContacts = allContacts;
                resolve(allContacts);
            }).catch((err) => {
                reject(err);
            });
        })
    }

    public updateWorkingContacts() {
        return new Promise((resolve, reject) => {
            this.getFormattedContacts().then(() => {
                let updatedWorkingContacts: Array<FormattedContact> = [];
                let selectedPhoneNumbers: Array<string> = [];
                this.workingContacts.forEach((contact) => {
                    contact.phoneNumbers.forEach((numberField) => {
                        if(numberField.selected) {
                            selectedPhoneNumbers.push(numberField.value);
                        }
                    });
                });

                this.formattedContacts.forEach((contact) => {
                    let contactClone: FormattedContact = {
                        id: contact.id,
                        displayName: contact.displayName,
                        phoneNumbers: [],
                        selected: false
                    };
                    contact.phoneNumbers.forEach((numberField) => {
                        let numberFieldClone = {
                            type: numberField.type,
                            value: numberField.value,
                            selected: false
                        }
                        if(selectedPhoneNumbers.indexOf(numberField.value) !== -1) {
                            numberFieldClone.selected = true;
                            contactClone.selected = true;
                        }
                        contactClone.phoneNumbers.push(numberFieldClone);
                    });
                    updatedWorkingContacts.push(contactClone);
                });
                this.workingContacts = updatedWorkingContacts;
                this.sortWorkingContacts();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public markWorkingContactsAsSelected() {
        this.workingContacts.forEach((contact) => {
            contact.selected = false;
            for(let number of contact.phoneNumbers) {
                if(number.selected) {
                    contact.selected = true;
                }
            }
        })
    }

    private formatContacts(unprocessedContacts: Array<Contact>) {
        let processedContacts: Array<FormattedContact> = [];

        unprocessedContacts.forEach((contact) => {
            let formattedContactPhoneNumbers = this.formatContactPhoneNumbers(contact.phoneNumbers);
            let reformattedContact: FormattedContact = {
                id: contact.id,
                displayName: contact.displayName,
                phoneNumbers: formattedContactPhoneNumbers,
                selected: false
            }
            processedContacts.push(reformattedContact);
        });

        return processedContacts;
    }

    private formatContactPhoneNumbers(unprocessedPhoneNumbers: Array<IContactField>) {
        let processedPhoneNumbers: Array<ExtendedContactField> = [];

        if(Array.isArray(unprocessedPhoneNumbers)) {
            unprocessedPhoneNumbers.forEach((numberField) => {
                let processedNumber: ExtendedContactField = {
                    type: numberField.type,
                    value: numberField.value,
                    selected: false
                }
                processedPhoneNumbers.push(processedNumber)
            });
        }

        return processedPhoneNumbers;
    }

    public checkPermission() {
        return new Promise((resolve, reject) => {
            this.getAllContacts().then(() => {
                resolve();
            }).catch((err) => {
                if(err == 20) {
                    reject({
                        permission: false,
                        message: 'Safety Net needs access to your Contacts in order to alert your selected contacts.'
                    });
                } else {
                    reject({permission: true});
                }
            });
        });
    }

    public sortWorkingContacts() {
        this.workingContacts.sort((a, b) => {
            if(a.displayName < b.displayName) {
                return -1;
            } else if (a.displayName > b.displayName) {
                return 1;
            } else {
                return 0;
            }
        })
    }
}
