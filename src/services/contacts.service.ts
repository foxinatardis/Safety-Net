import { Injectable } from "@angular/core";
import { Contacts, Contact, ContactField, ContactName, IContactField } from '@ionic-native/contacts';
import { FormattedContact } from '../interfaces/formattedContact.interface';
import { ExtendedContactField } from '../interfaces/extendedContactField.interface';

@Injectable()
export class ContactsService {
    constructor(
        private contacts: Contacts
    ) {
        this.getFormattedContacts().catch((err) => {
            console.log("Error gettign formatted contacts.");
            console.log("error: " + err);
            console.log();
        });
    }

    rawContacts: Array<Contact> = [];
    formattedContacts: Array<FormattedContact> = [];
    workingContacts: Array<FormattedContact> = [];

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

                console.log('allContacts: ', allContacts);
                resolve(allContacts);
            }).catch((err) => {
                reject(err);
            });
        })
    }

    public updateWorkingContacts() {
        if(this.formattedContacts.length > 0) {
            let workingContactIds = [];
            let formattedContactIds = [];
            let deadContactIds = [];
            let updatedWorkingContacts = [];
            this.workingContacts.forEach((contact) => {
                // push working contact ids to workingIds array
                workingContactIds.push(contact.id);
            });
            this.formattedContacts.forEach((contact) => {
                formattedContactIds.push(contact.id);
                if(workingContactIds.indexOf(contact.id) === -1) {
                    // if there is a contact in 'formattedContacts' that is not in 'workingContacts'
                    // create a clone of the missing contact and add to the working contacts array
                    let contactClone: FormattedContact = {
                        id: contact.id,
                        displayName: contact.displayName,
                        phoneNumbers: contact.phoneNumbers,
                        selected: false
                    }
                    this.workingContacts.push(contactClone);
                }
            });
            for(let id of workingContactIds) {
                // walk through workingContactIds to find contacts which have been removed from the phone
                if(formattedContactIds.indexOf(id) === -1) {
                    // if a contact is dead, add the id to deadContactIds
                    deadContactIds.push(id);
                }
            }
            if(deadContactIds.length > 0) {
                this.workingContacts.forEach((contact) => {
                    if(deadContactIds.indexOf(contact.id) === -1) {
                        updatedWorkingContacts.push(contact);
                    }
                });
                this.workingContacts = updatedWorkingContacts;
            }
            console.log(this.workingContacts[0].phoneNumbers);
            console.log();
        } else {
            this.getFormattedContacts().then(() => {
                this.updateWorkingContacts();
            });
        }
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

        unprocessedPhoneNumbers.forEach((numberField) => {
            let processedNumber: ExtendedContactField = {
                type: numberField.type,
                value: numberField.value,
                selected: false
            }
            processedPhoneNumbers.push(processedNumber)
        });

        return processedPhoneNumbers;
    }
}
