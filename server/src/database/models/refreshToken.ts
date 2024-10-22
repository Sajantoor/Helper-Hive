import { Schema, model } from 'mongoose';

const expiryTime = 60 * 60 * 24 * 7; // 7 days in seconds
const refreshTokenSchema = new Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: expiryTime }
});

const RefreshToken = model("refreshToken", refreshTokenSchema);
export default RefreshToken;
