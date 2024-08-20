import { Schema, model } from 'mongoose';

const organizationSchema = new Schema({
    name: { type: String, required: true },
    profilePicture: { type: String },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phoneNumber: { type: String, required: true, match: /^\+?[1-9]\d{1,14}$/ },
    contactPerson: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    password: { type: String, required: true }
});

const Organization = model("organization", organizationSchema);
export default Organization;
