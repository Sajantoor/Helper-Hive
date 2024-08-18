import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    emergencyContact: {
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        relationship: { type: String, required: true }
    }
});

export default model("user", userSchema);
