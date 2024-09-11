import { Schema, model } from 'mongoose';

export interface IOrganization {
    name: string;
    logo?: string;
    email: string;
    phoneNumber: string;
    contactPerson: {
        firstName: string;
        lastName: string;
    };
    emailConfirmed: boolean;
    verified: boolean;
    password: string;
}

const organizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    logo: { type: String },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phoneNumber: { type: String, required: true, match: /^\+?[1-9]\d{1,14}$/ },
    contactPerson: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    emailConfirmed: { type: Boolean, default: false },
    // Verified to post events on the platform
    verified: { type: Boolean, default: false },
    password: { type: String, required: true }
});

const Organization = model("organization", organizationSchema);
export default Organization;
