import { Schema, model } from 'mongoose';

const expiryTime = 60 * 60 * 24; // 1 day in seconds
const passwordResetTokenSchema = new Schema({
    token: { type: String, required: true, unique: true },
    id: { type: String, required: true },
    isOrganization: { type: Boolean, required: true },
    createdAt: { type: Date, expires: expiryTime }
});

const PasswordResetToken = model("passwordResetToken", passwordResetTokenSchema);
export default PasswordResetToken;
