import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phoneNumber: { type: String, required: true, match: /^\+?[1-9]\d{1,14}$/ },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    // emergencyContact: {
    //     name: { type: String, required: true },
    //     phoneNumber: { type: String, required: true, match: /^\+?[1-9]\d{1,14}$/ },
    //     relationship: { type: String, required: true }
    // },
    registeredEvents: [{ type: Schema.Types.ObjectId, ref: 'event' }],
    emailConfirmed: { type: Boolean, default: false }
});

const User = model("user", userSchema);
export default User;
