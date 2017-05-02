import { ExtendedContactField } from './extendedContactField.interface';

export interface FormattedContact {
    id: string,
    displayName: string,
    phoneNumbers: Array<ExtendedContactField>,
    selected: boolean
}
