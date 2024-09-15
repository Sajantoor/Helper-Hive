import { Schema, Types, model } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    dateOfBirth: Date;
    avatar: string;
    // emergencyContact: {
    //     name: string;
    //     phoneNumber: string;
    //     relationship: string;
    // };
    registeredEvents: Types.ObjectId[];
    emailConfirmed: boolean;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    avatar: { type: String, required: true },
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
