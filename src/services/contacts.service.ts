import { Injectable } from "@angular/core";
import { Contacts, Contact, ContactField, ContactName, IContactField } from '@ionic-native/contacts';
import { FormattedContact } from '../interfaces/formattedContact.interface';
import { ExtendedContactField } from '../interfaces/extendedContactField.interface';

@Injectable()
export class ContactsService {
    constructor(
        private contacts: Contacts
    ) {
        this.getAllContacts().then(() => {
            this.formattedContacts = this.formatContacts(this.rawContacts);
        });
    }

    rawContacts: Array<Contact>;
    formattedContacts: Array<FormattedContact>;
    workingContacts: Array<FormattedContact>;

    private getAllContacts() {
        let findOptions = {
            desiredFields: [
                'id',
                'displayName',
                'phoneNumbers'
            ]
        };

        return this.contacts.find([], findOptions).then((allContacts) => {
            this.rawContacts = allContacts;
        });
    }

    public updateWorkingContacts() {
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
            if(!workingContactIds.includes(contact.id)) {
                // if there is a contact in 'formattedContacts' that is not in 'workingContacts'
                // create a clone of the missing contact and add to the working contacts array
                this.workingContacts.push(formatContacts([contact])[0]);
            }
        });
        for(let id of workingContactIds) {
            // walk through workingContactIds to find contacts which have been removed from the phone
            if(!formattedContactIds.includes(id)) {
                // if a contact is dead, add the id to deadContactIds
                deadContactIds.push(id);
            }
        }
        if(deadContactIds.length > 0) {
            this.workingContacts.forEach((contact) => {
                if(!deadContactIds.includes(contact.id)) {
                    updatedWorkingContacts.push(contact);
                }
            });
            this.workingContacts = updatedWorkingContacts;
        }
    }

    private formatContacts(unprocessedContacts: Array<Contact>) {
        let processedContacts: Array<FormattedContact> = [];

        unprocessedContacts.forEach((contact) => {
            let reformattedContact: FormattedContact = {
                id: contact.id,
                displayName: contact.displayName,
                phoneNumbers: this.formatContactPhoneNumbers(contact.phoneNumbers),
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
